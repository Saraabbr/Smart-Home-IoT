from django.urls import path
from .views import DeviceListAPIView, DeviceUpdateIsOnAPIView, DeviceEnergyConsumptionSumAPIView

urlpatterns = [
    path("devices/", DeviceListAPIView.as_view(), name="device-list"),
    path("devices/<int:pk>/is_on/", DeviceUpdateIsOnAPIView.as_view(), name="device-update-is-on"),
    path(
        "devices/energy_consumption/total/",
        DeviceEnergyConsumptionSumAPIView.as_view(),
        name="device-energy-consumption-sum",
    ),
]
