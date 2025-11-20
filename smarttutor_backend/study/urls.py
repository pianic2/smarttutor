from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from study.views import CourseViewSet, NoteViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
# Note: nested routing manuale

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include(router.urls)),

    # Note nested per corso (es: /api/courses/1/notes/)
    path(
        'api/courses/<int:course_pk>/notes/',
        NoteViewSet.as_view({'get': 'list', 'post': 'create'}),
        name='note-list'
    ),
    path(
        'api/courses/<int:course_pk>/notes/<int:pk>/',
        NoteViewSet.as_view({'get': 'retrieve', 'put': 'update',
                             'patch': 'partial_update', 'delete': 'destroy'}),
        name='note-detail'
    ),
]
