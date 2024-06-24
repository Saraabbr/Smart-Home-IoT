from django.db import models


class Device(models.Model):
    DEVICE_TYPES = [
        ("lamp", "Lamp"),
        ("chandelier", "Chandelier"),
        ("washing_machine", "Washing Machine"),
        ("tv", "TV"),
        ("dishwasher", "Dishwasher"),
        ("fridge", "Fridge"),
        ("microwave", "Microwave"),
        ("air_conditioner", "Air Conditioner"),
        ("heater", "Heater"),
        ("computer", "Computer"),
        ("speaker", "Speaker"),
        ("blinds", "Blinds"),
        ("plug", "Plug"),
    ]

    name = models.CharField(max_length=100, choices=DEVICE_TYPES)
    location = models.CharField(max_length=100)
    is_on = models.BooleanField(default=False)
    energy_consumption = models.FloatField(default=0.0)

    def __str__(self):
        return dict(self.DEVICE_TYPES).get(self.name, "Unknown Device")
