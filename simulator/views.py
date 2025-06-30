from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
import json


def home(request):
    return render(request, "simulator/home.html")


def simulate(request: HttpRequest):
    if request.method == "POST":
        body = json.loads(request.body)
        power_cost = body.get("powerCost", [])
        devices = body.get("devices", [])
        print(power_cost, devices)

        return JsonResponse({"status": "OK"})
    return JsonResponse({"error": "Bad request"}, status=405)
