from django.contrib import admin
from .models import Company, DataSource, EmissionRecord, UploadedFile


admin.site.register(Company)
admin.site.register(DataSource)
admin.site.register(UploadedFile)


@admin.register(EmissionRecord)
class EmissionRecordAdmin(admin.ModelAdmin):
    list_display = (
        'activity_type',
        'quantity',
        'unit',
        'scope',
        'status',
        'flagged'
    )

    list_filter = (
        'status',
        'scope',
        'flagged'
    )

    search_fields = (
        'activity_type',
    )
    actions = ['approve_records', 'reject_records']

    def approve_records(self, request, queryset):
        queryset.update(status='APPROVED')

    approve_records.short_description = "Approve selected records"

    def reject_records(self, request, queryset):
        queryset.update(status='REJECTED')

    reject_records.short_description = "Reject selected records"