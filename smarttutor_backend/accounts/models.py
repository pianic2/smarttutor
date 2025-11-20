from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Campi extra per futuro uso (es. università, corso di laurea)
    # university = models.CharField(max_length=255, blank=True)
    # field_of_study = models.CharField(max_length=255, blank=True)

    # Esempio: impostazioni base di notifica
    # wants_email_notifications = models.BooleanField(default=True)

    def __str__(self):
        return self.username
