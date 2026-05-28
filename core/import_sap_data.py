import pandas as pd

from core.models import Company, DataSource, EmissionRecord


def import_sap_csv(file_path):

    company = Company.objects.first()

    source = DataSource.objects.create(
        company=company,
        source_type='SAP',
        upload_name='sap_fuel_data.csv'
    )

    df = pd.read_csv(file_path)

    for _, row in df.iterrows():

        unit = str(row['unit']).lower().strip()

        unit_mapping = {
            'l': 'L',
            'liter': 'L',
            'liters': 'L',
            'litre': 'L',
            'litres': 'L',
            'ltr': 'L',
            'kl': 'KL',
            'gallon': 'gallon'
        }

        normalized_unit = unit_mapping.get(unit, unit)

        activity = row['material_name']

        scope_mapping = {
            'Diesel Fuel': 'Scope 1',
            'Petrol': 'Scope 1',
            'Natural Gas': 'Scope 1',
            'Electricity': 'Scope 2'
        }

        scope = scope_mapping.get(activity, 'Scope 3')

        flagged = False
        flagged_reason = ""

        if row['quantity'] < 0:
            flagged = True
            flagged_reason = "Negative quantity"

        elif unit not in unit_mapping:
            flagged = True
            flagged_reason = "Unknown unit"

        elif str(row['plant_code']).strip().upper() == 'UNKNOWN':
            flagged = True
            flagged_reason = "Unknown plant code"

        EmissionRecord.objects.create(
            company=company,
            source=source,
            activity_type=activity,
            quantity=row['quantity'],
            unit=normalized_unit,
            scope=scope,
            status='PENDING',
            flagged=flagged,
            flagged_reason=flagged_reason
        )

    print("SAP CSV imported successfully!")