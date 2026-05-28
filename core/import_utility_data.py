import pandas as pd

from core.models import Company, DataSource, EmissionRecord


def import_utility_csv(file_path):

    company = Company.objects.first()

    source = DataSource.objects.create(
        company=company,
        source_type='UTILITY',
        upload_name='utility_data.csv'
    )

    df = pd.read_csv(file_path)

    for _, row in df.iterrows():

        flagged = False
        flagged_reason = ""

        if row['electricity_kwh'] < 0:
            flagged = True
            flagged_reason = "Negative electricity usage"

        elif str(row['meter_id']).strip().upper() == 'UNKNOWN':
            flagged = True
            flagged_reason = "Unknown meter ID"

        EmissionRecord.objects.create(
            company=company,
            source=source,
            activity_type='Electricity Usage',
            quantity=row['electricity_kwh'],
            unit='kWh',
            scope='Scope 2',
            status='PENDING',
            flagged=flagged,
            flagged_reason=flagged_reason
        )

    print("Utility CSV imported successfully!")