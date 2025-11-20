from django.contrib import admin
from .models import Course, CourseMembership, Note

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by', 'created_at')
    search_fields = ('name', 'description')


@admin.register(CourseMembership)
class CourseMembershipAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'course', 'role', 'joined_at')
    list_filter = ('role',)


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'course', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
