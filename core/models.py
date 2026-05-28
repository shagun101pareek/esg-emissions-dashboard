from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"


class DataSource(models.Model):
    SOURCE_TYPES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'Utility'),
        ('TRAVEL', 'Travel'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)
    upload_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company.name} - {self.source_type}"

class EmissionRecord(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    source = models.ForeignKey(DataSource, on_delete=models.CASCADE)

    activity_type = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)

    scope = models.CharField(max_length=20)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    flagged = models.BooleanField(default=False)
    flagged_reason = models.TextField(blank=True, null=True)

    review_notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.activity_type} - {self.quantity} {self.unit}"

class UploadedFile(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    file = models.FileField(upload_to='uploads/')

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        from core.import_sap_data import import_sap_csv

        import_sap_csv(self.file.path)