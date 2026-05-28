from django.urls import path

from .api_views import (
    emission_records,
    approve_record,
    reject_record
)


urlpatterns = [

    path('emissions/', emission_records),

    path(
        'emissions/<int:record_id>/approve/',
        approve_record
    ),

    path(
        'emissions/<int:record_id>/reject/',
        reject_record
    ),

]