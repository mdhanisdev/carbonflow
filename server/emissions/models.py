from django.db import models


class EmissionRecord(models.Model):

    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    SCOPE_CHOICES = [
        ('Scope 1', 'Scope 1'),
        ('Scope 2', 'Scope 2'),
        ('Scope 3', 'Scope 3'),
    ]

    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES)

    category = models.CharField(max_length=100)

    date = models.DateField()

    value = models.FloatField()

    unit = models.CharField(max_length=20)

    normalized_unit = models.CharField(max_length=20, default='kgCO2e')

    scope = models.CharField(max_length=20, choices=SCOPE_CHOICES)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    suspicious = models.BooleanField(default=False)

    source_file = models.CharField(max_length=255, null=True, blank=True)

    original_row_data = models.JSONField(null=True, blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.source_type} - {self.category}"