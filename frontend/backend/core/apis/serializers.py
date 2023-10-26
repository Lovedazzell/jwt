from rest_framework.serializers import ModelSerializer
from core.models import Notes


class SerializersNotes(ModelSerializer):
    class Meta:
        model = Notes
        fields = '__all__'


