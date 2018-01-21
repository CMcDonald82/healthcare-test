from django.db import models

class Symptom(models.Model):
    name = models.CharField(max_length=256, blank=False)

    def __unicode__(self):
        return '%s' % (self.name)

class Diagnosis(models.Model):
    name = models.CharField(max_length=256, blank=False)
    frequency = models.IntegerField(default=0, db_index=True)
    symptom = models.ForeignKey(Symptom, related_name='diagnoses', on_delete=models.CASCADE)

    class Meta:
        ordering = ('-frequency',)

    def __unicode__(self):
        return '%s' % (self.name)
