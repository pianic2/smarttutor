from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, CourseMembership, Note

User = get_user_model()


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CourseMembershipSerializer(serializers.ModelSerializer):
    user = UserBasicSerializer(read_only=True)

    class Meta:
        model = CourseMembership
        fields = ['id', 'user', 'role', 'joined_at']


class CourseSerializer(serializers.ModelSerializer):
    created_by = UserBasicSerializer(read_only=True)
    memberships = CourseMembershipSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'created_by', 'created_at', 'memberships']


class CourseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['name', 'description']


class NoteSerializer(serializers.ModelSerializer):
    author = UserBasicSerializer(read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'course', 'author', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['course']
