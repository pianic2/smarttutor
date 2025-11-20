from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from study.views import CourseViewSet, NoteViewSet

# Router principale per le risorse standard REST
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # AUTH API (JWT + register + me)
    # Espone:
    #   /api/auth/register/
    #   /api/auth/token/
    #   /api/auth/token/refresh/
    #   /api/auth/me/
    path('api/auth/', include('accounts.urls')),

    # API REST principali
    # Espone:
    #   /api/courses/
    #   /api/courses/<id>/
    path('api/', include(router.urls)),

    # NOTE NIDIFICATE sotto CORSO
    # Espone:
    #   /api/courses/<course_pk>/notes/
    #   /api/courses/<course_pk>/notes/<pk>/
    path(
        'api/courses/<int:course_pk>/notes/',
        NoteViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='note-list'
    ),
    path(
        'api/courses/<int:course_pk>/notes/<int:pk>/',
        NoteViewSet.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'partial_update',
            'delete': 'destroy',
        }),
        name='note-detail'
    ),
]
