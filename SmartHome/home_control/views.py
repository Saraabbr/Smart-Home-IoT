from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Device
from .serializers import DeviceSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum


class DeviceListAPIView(APIView):
    def get(self, request):
        devices = Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data)


class DeviceUpdateIsOnAPIView(APIView):
    def patch(self, request, pk):
        device = get_object_or_404(Device, pk=pk)
        is_on = request.data.get("is_on")

        if is_on is not None:
            device.is_on = is_on
            device.save()
            total_energy_consumption = (
                Device.objects.filter(is_on=True).aggregate(Sum("energy_consumption"))["energy_consumption__sum"]
                or 0.0
            )
            return Response({"is_on": device.is_on, "total_energy_consumption": total_energy_consumption})
        return Response({"error": "is_on field not provided"}, status=status.HTTP_400_BAD_REQUEST)


class DeviceEnergyConsumptionSumAPIView(APIView):
    def get(self, request):
        total_energy_consumption = (
            Device.objects.filter(is_on=True).aggregate(Sum("energy_consumption"))["energy_consumption__sum"] or 0.0
        )
        return Response({"total_energy_consumption": total_energy_consumption})
