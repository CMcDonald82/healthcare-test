from django.test import TestCase
from django.urls import reverse
from .models import Symptom, Diagnosis
import json


def create_symptom(name):
    """
    Create a single symptom with the given name
    """
    return Symptom.objects.create(name=name)

def create_symptoms(symptom_names):
    """
    Create symptoms with the given names from the symptom_names list
    """
    for name in symptom_names:
        create_symptom(name)

def create_diagnosis(diagnosis, symptom):
    """
    Create a diagnosis for the given symptom
    """
    return Diagnosis.objects.create(name=diagnosis['name'], frequency=diagnosis['frequency'], symptom=symptom)

def create_diagnoses(diagnoses, symptom):
    """
    Create diagnoses with the given names from the diagnosis_names list for the given symptom
    """
    for diagnosis in diagnoses:
        create_diagnosis(diagnosis, symptom)

def create_symptom_with_diagnoses(symptom_name, diagnoses):
    """
    Create a symptom with the given name and create diagnoses with the given names from the 
    diagnosis_names list for the given symptom
    """
    symptom = create_symptom(symptom_name)
    create_diagnoses(diagnoses, symptom)


class ApiModelTests(TestCase):

    def test_symptom_representation(self):
        name = "sore throat"
        symptom = Symptom(name=name)
        self.assertEqual(symptom.name, name)

    def test_diagnosis_representation(self):
        symptom_name = "sore throat"
        diagnosis_name = "common cold"
        symptom = Symptom(name=symptom_name)
        diagnosis = Diagnosis(name=diagnosis_name, symptom=symptom)
        self.assertEqual(diagnosis.name, diagnosis_name)
        self.assertEqual(diagnosis.frequency, 0)
        self.assertEqual(diagnosis.symptom.name, symptom_name)


class ApiViewTests(TestCase):

    def test_empty_symptom_list(self):
        """
        Test a request for the list of all symptoms when no symptoms exist in the db
        """
        url = reverse('api:index')
        response = self.client.get(url)
        response_json = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_json), 0)

    def test_symptom_list(self):
        """
        Test a request for the list of all symptoms 
        """
        create_symptoms(["sore throat", "itchy rash"])
        url = reverse('api:index')
        response = self.client.get(url)
        response_json = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_json), 2)

    def test_symptom_detail_valid(self):
        """
        Test that the symptom_detail view returns valid symptom with its associated diagnoses 
        """
        symptom_name = "sore throat"
        diagnoses = [
            {"name": "common cold", "frequency": 0},
            {"name": "viral throat infection", "frequency": 0}
        ]
        create_symptom_with_diagnoses(symptom_name, diagnoses)

        url = reverse('api:symptom_detail', args=(1,))
        response = self.client.get(url)
        response_json = json.loads(response.content)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_json['diagnoses']), 2)
        self.assertEqual(response_json['name'], symptom_name)
        self.assertEqual(response_json['diagnoses'][0]['name'], diagnoses[0]['name'])
        self.assertEqual(response_json['diagnoses'][1]['name'], diagnoses[1]['name'])

    def test_symptom_detail_invalid(self):
        """
        Test that a request for detail for a symptom that does not exist fails
        """
        url = reverse('api:symptom_detail', args=(1000,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_increment_diagnosis_frequency_valid(self):
        """
        Test that a post request to the given diagnosis increments the frequency count of that diagnosis by 1.
        """
        symptom_name = "sore throat"
        diagnoses = [
            {"name": "common cold", "frequency": 0},
            {"name": "viral throat infection", "frequency": 0}
        ]
        create_symptom_with_diagnoses(symptom_name, diagnoses)

        url = reverse('api:diagnosis_detail', args=(1,))
        patch_data = json.dumps({'increment_frequency': True})
        response = self.client.patch(url, patch_data, content_type='application/json')
        response_json = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_json['name'], diagnoses[0]['name'])
        self.assertEqual(response_json['frequency'], 1)

    def test_increment_diagnosis_frequency_invalid_patch_data(self):
        """
        Test that a post request to the given diagnosis does not increment the frequency of that diagnosis
        if 'increment_frequency': True is not passed as part of the request. Both the conditions where 
        'increment_frequency': False and where 'increment_frequency' is not included at all are tested.
        """
        symptom_name = "sore throat"
        diagnoses = [
            {"name": "common cold", "frequency": 0},
            {"name": "viral throat infection", "frequency": 0}
        ]
        create_symptom_with_diagnoses(symptom_name, diagnoses)

        url = reverse('api:diagnosis_detail', args=(1,))
        empty_patch_data = json.dumps({})
        response_empty = self.client.patch(url, empty_patch_data, content_type='application/json')
        response_empty_json = json.loads(response_empty.content)

        self.assertEqual(response_empty.status_code, 200)
        self.assertEqual(response_empty_json['name'], diagnoses[0]['name'])
        self.assertEqual(response_empty_json['frequency'], 0)

        false_patch_data = json.dumps({'increment_frequency': False})
        response_false = self.client.patch(url, false_patch_data, content_type='application/json')
        response_false_json = json.loads(response_false.content)

        self.assertEqual(response_false.status_code, 200)
        self.assertEqual(response_false_json['name'], diagnoses[0]['name'])
        self.assertEqual(response_false_json['frequency'], 0)

    def test_increment_diagnosis_frequency_invalid_diagnosis(self):
        """
        Test that post request to increment the frequency of a diagnosis that does not exist fails
        """
        url = reverse('api:diagnosis_detail', args=(1000,))
        patch_data = json.dumps({'increment_frequency': True})
        response = self.client.patch(url, patch_data, content_type='application/json')
        self.assertEqual(response.status_code, 404)
