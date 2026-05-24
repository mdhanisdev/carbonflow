from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import EmissionRecord
from .serializers import EmissionRecordSerializer

import pandas as pd


class EmissionRecordViewSet(viewsets.ModelViewSet):

    queryset = EmissionRecord.objects.all().order_by('-uploaded_at')

    serializer_class = EmissionRecordSerializer

    @action(detail=False, methods=['POST'])
    def upload_csv(self, request):

        file = request.FILES.get('file')

        if not file:
            return Response({
                'error': 'No file uploaded'
            })

        df = pd.read_csv(file)

        created_records = []

        for _, row in df.iterrows():

            suspicious = False

            value = float(row['value'])

            if value > 10000:
                suspicious = True

            record = EmissionRecord.objects.create(

                source_type=row['source_type'],

                category=row['category'],

                date=row['date'],

                value=value,

                unit=row['unit'],

                scope=row['scope'],

                suspicious=suspicious,

                source_file=file.name,

                original_row_data=row.to_dict()
            )

            created_records.append(record.id)

        return Response({
            'message': 'CSV uploaded successfully',
            'records_created': len(created_records)
        })