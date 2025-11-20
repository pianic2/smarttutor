from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='courses_created'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    # Futuro: aggiungere campi come anno accademico, semestre, ecc.

    def __str__(self):
        return self.name


class CourseMembership(models.Model):
    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('member', 'Member'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_memberships')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='memberships')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user} - {self.course} ({self.role})"


class Note(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='notes')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='notes')
    title = models.CharField(max_length=255)
    content = models.TextField()  # per ora testo semplice/markdown
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Futuro: versioning, locking, commenti

    def __str__(self):
        return f"{self.title} ({self.course.name})"
