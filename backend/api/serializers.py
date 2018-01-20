from rest_framework import serializers
from api.models import Symptom, Diagnosis


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = '__all__'

        
class SymptomSerializer(serializers.ModelSerializer):
    diagnoses = DiagnosisSerializer(many=True, read_only=True)
    class Meta:
        model = Symptom
        fields = '__all__'
        depth: 2


# class SymptomListSerializer(serializers.ModelSerializer):
#     label = serializers.CharField(source='name')
#     value = serializers.IntegerField(source='id')
#     class Meta:
#         model = Symptom
#         fields = ('label', 'value')