from django.core.management.base import BaseCommand, CommandError
from api.models import Symptom, Diagnosis
from django.db import transaction
import csv

class Command(BaseCommand):
    help = 'Seeds the database with the symptom & diagnosis data from the specified csv file'

    def handle(self, *args, **options):
        with open('./symptoms.txt') as f:
            reader = csv.reader(f)
            for row in reader:
                with transaction.atomic():
                    symp = Symptom.objects.create(name=row[0].lstrip())
                    symp.diagnoses.set([Diagnosis.objects.create(name=diag.lstrip(), symptom=symp) for diag in row[1:]])
                self.stdout.write("Row: %s" % row)