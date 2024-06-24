from rest_framework import serializers
from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    name_display = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = "__all__"

    def get_name_display(self, obj):
        return obj.get_name_display()
