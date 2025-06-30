from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
import json


# Função para renderizar o HTML da home
def home(request):
    return render(request, "simulator/home.html")


# Função para calcular o gasto de cada dispositivo por dia
def get_devices_daily_cost(devices, power_cost):
    daily_cost = [
        {
            "name": device["name"],
            "cost": round(((((device["averagePower"]/1000) * device["usageTime"]) * device["amount"]) * power_cost), 2)
        }
        for device in devices
    ]

    return daily_cost


# Função para calcular o gasto dos dispositivos no periodo determinado
def get_devices_periodic_cost(devices_daily_cost, days):
    periodic_cost = [
        {
            "name": device["name"],
            "cost": device["cost"] * days
        }
        for device in devices_daily_cost
    ]

    return periodic_cost


def simulate(request: HttpRequest):
    if request.method == "POST":
        body = json.loads(request.body)
        power_cost = float(body.get("powerCost", []))
        days = int(body.get("days", []))
        devices = body.get("devices", [])

        daily_cost = get_devices_daily_cost(devices, power_cost)
        periodic_cost = get_devices_periodic_cost(daily_cost, days)

        print(daily_cost, periodic_cost)

        return JsonResponse({"status": "OK"})
    return JsonResponse({"error": "Bad request"}, status=405)
