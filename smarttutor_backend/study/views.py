from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Course, CourseMembership, Note
from .serializers import (
    CourseSerializer,
    CourseCreateSerializer,
    NoteSerializer,
)
from django.contrib.auth import get_user_model

User = get_user_model()


class IsCourseMember(permissions.BasePermission):
    """
    Permette accesso solo agli utenti che sono membri del corso.
    """

    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Course):
            course = obj
        elif isinstance(obj, Note):
            course = obj.course
        else:
            return False

        return CourseMembership.objects.filter(
            course=course,
            user=request.user,
        ).exists()


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()

    def get_serializer_class(self):
        if self.action in ['create']:
            return CourseCreateSerializer
        return CourseSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def get_queryset(self):
        # solo corsi dove l'utente è membro
        return Course.objects.filter(memberships__user=self.request.user).distinct()

    @transaction.atomic
    def perform_create(self, serializer):
        course = serializer.save(created_by=self.request.user)
        # creator diventa owner
        CourseMembership.objects.create(
            user=self.request.user,
            course=course,
            role='owner'
        )

    @action(detail=True, methods=['post'], url_path='add-member')
    def add_member(self, request, pk=None):
        course = self.get_object()  # già filtrato per membership
        # controlla che richiedente sia owner
        membership = CourseMembership.objects.filter(
            course=course, user=request.user, role='owner'
        ).first()
        if not membership:
            return Response({'detail': 'Solo il proprietario può aggiungere membri.'},
                            status=status.HTTP_403_FORBIDDEN)

        username = request.data.get('username')
        if not username:
            return Response({'detail': 'username è richiesto.'},
                            status=status.HTTP_400_BAD_REQUEST)

        user_to_add = get_object_or_404(User, username=username)
        CourseMembership.objects.get_or_create(user=user_to_add, course=course, defaults={'role': 'member'})
        return Response({'detail': f'Utente {username} aggiunto al corso.'})


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsCourseMember]

    def get_queryset(self):
        course_id = self.kwargs.get('course_pk')
        return Note.objects.filter(course_id=course_id, course__memberships__user=self.request.user).distinct()

    def perform_create(self, serializer):
        course_id = self.kwargs.get('course_pk')
        course = get_object_or_404(
            Course.objects.filter(memberships__user=self.request.user),
            pk=course_id
        )
        serializer.save(course=course, author=self.request.user)
