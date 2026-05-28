import json

from core.models import Company, DataSource, EmissionRecord


def import_travel_data(file_path):

    company = Company.objects.first()

    source = DataSource.objects.create(
        company=company,
        source_type='TRAVEL',
        upload_name='travel_data.json'
    )

    with open(file_path, 'r') as file:
        data = json.load(file)

    for row in data:

        flagged = False
        flagged_reason = ""

        if row['distance_km'] < 0:
            flagged = True
            flagged_reason = "Negative travel distance"

        elif row['employee'].strip().upper() == 'UNKNOWN':
            flagged = True
            flagged_reason = "Unknown employee"

        EmissionRecord.objects.create(
            company=company,
            source=source,
            activity_type=row['flight_type'],
            quantity=row['distance_km'],
            unit='km',
            scope='Scope 3',
            status='PENDING',
            flagged=flagged,
            flagged_reason=flagged_reason
        )

    print("Travel data imported successfully!")