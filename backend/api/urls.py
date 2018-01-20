from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'api'
urlpatterns = [
    path('symptoms/', views.SymptomList.as_view(), name='index'),
]

urlpatterns = format_suffix_patterns(urlpatterns)