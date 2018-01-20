from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from api.models import Symptom, Diagnosis
from api.serializers import SymptomSerializer, DiagnosisSerializer, SymptomListSerializer
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

