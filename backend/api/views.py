from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from api.models import Symptom, Diagnosis
from api.serializers import SymptomSerializer, DiagnosisSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SymptomList(APIView):
    """
    List all Symptoms
    """
    def get(self, request, format=None):
        symptoms = Symptom.objects.all()
        serializer = SymptomSerializer(symptoms, many=True)
        return Response(serializer.data)


class SymptomDetail(APIView):
    """
    Retrieve a symptom with all its related diagnoses in detail
    """
    def get_object(self, pk):
        try:
            return Symptom.objects.get(pk=pk)
        except Symptom.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        symptom = self.get_object(pk)
        serializer = SymptomSerializer(symptom)
        return Response(serializer.data)