from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import EmissionRecord
from .serializers import EmissionRecordSerializer


@api_view(['GET'])
def emission_records(request):

    records = EmissionRecord.objects.all()

    serializer = EmissionRecordSerializer(records, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def approve_record(request, record_id):

    try:
        record = EmissionRecord.objects.get(id=record_id)

        record.status = 'APPROVED'
        record.save()

        return Response({
            'message': 'Record approved successfully'
        })

    except EmissionRecord.DoesNotExist:

        return Response({
            'error': 'Record not found'
        }, status=404)


@api_view(['POST'])
def reject_record(request, record_id):

    try:
        record = EmissionRecord.objects.get(id=record_id)

        record.status = 'REJECTED'
        record.save()

        return Response({
            'message': 'Record rejected successfully'
        })

    except EmissionRecord.DoesNotExist:

        return Response({
            'error': 'Record not found'
        }, status=404)