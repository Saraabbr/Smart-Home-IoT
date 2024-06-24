import json
from django.core.management.base import BaseCommand
from home_control.models import Device


class Command(BaseCommand):
    help = "Load example data into the database"

    def handle(self, *args, **kwargs):
        Device.objects.all().delete()

        with open("data.json", "r") as file:
            data = json.load(file)
            for item in data:
                Device.objects.create(
                    name=item["name"],
                    location=item["location"],
                    is_on=item["is_on"],
                    energy_consumption=item["energy_consumption"],
                )

        self.stdout.write(self.style.SUCCESS("Successfully loaded example data"))
