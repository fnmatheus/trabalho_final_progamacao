from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
import matplotlib.pyplot as plt
import numpy as np
import json


# Função para renderizar o HTML da home
def home(request: HttpRequest):
    return render(request, "simulator/home.html")


# Função para calcular o gasto de uma unidade cada dispositivo por dia
def get_unit_devices_daily_cost(devices, power_cost):
    unit_daily_cost = [
        {
            "name": device["name"],
            "cost": round((((device["averagePower"]/1000) * device["usageTime"]) * power_cost), 2),
            "amount": device["amount"],
        }
        for device in devices
    ]

    return unit_daily_cost


# Função para calcular o gasto diario de cada grupo de dispositivo
def get_devices_daily_cost(devices_unit_daily_cost):
    daily_cost = [
        {
            "name": device["name"],
            "cost": round(device["cost"] * device["amount"], 2)
        }
        for device in devices_unit_daily_cost
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


# Função para calcular total no dicionario com os custos
def get_total_cost(devices):
    total_cost = round(sum(device["cost"] for device in devices), 2)
    return total_cost


path = "simulator/static/simulator/plots/"


def plot_simple_bar(devices, name, title, xlabel, ylabel):
    labels = [device["name"] for device in devices]
    costs = [device["cost"] for device in devices]

    plt.figure(figsize=(16, 9))

    plt.bar(labels, costs, color="#ff9900")

    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title(title)

    plt.savefig(f"{path}{name}.svg", dpi=300, bbox_inches='tight')
    plt.close()

    return {"path": f"{path}{name}.svg"}


def plot_double_bar(units, groups, name, title, xlabel, ylabel):
    labels = [device["name"] for device in units]
    units_costs = [device["cost"] for device in units]
    groups_costs = [device["cost"] for device in groups]

    x_position = np.arange(len(labels))
    bar_width = 0.35
    first_position = x_position - bar_width/2
    second_position = x_position + bar_width/2

    plt.figure(figsize=(16, 9))

    plt.bar(
        first_position,
        units_costs,
        width=bar_width,
        label="Unidade",
        color="#232A31"
    )
    plt.bar(
        second_position,
        groups_costs,
        width=bar_width,
        label="Grupo",
        color="#ff9900"
    )

    plt.xticks(x_position, labels)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.title(title)

    plt.savefig(f"{path}{name}.svg", dpi=300, bbox_inches='tight')
    plt.close()

    return {"path": f"{path}{name}.svg"}


def simulate(request: HttpRequest):
    if request.method == "POST":
        body = json.loads(request.body)
        power_cost = float(body.get("powerCost", []))
        days = int(body.get("days", []))
        devices = body.get("devices", [])

        unit_daily_cost = get_unit_devices_daily_cost(devices, power_cost)
        daily_cost = get_devices_daily_cost(unit_daily_cost)
        total_daily_cost = get_total_cost(daily_cost)
        periodic_cost = get_devices_periodic_cost(daily_cost, days)
        total_periodic_cost = get_total_cost(periodic_cost)

        periodic_plot = plot_simple_bar(
            periodic_cost,
            "periodic_cost_plot",
            f"Consumo em {days} dias por dispositivo",
            "Dispositivos",
            "Gasto Enegético em R$",
        )

        unitxgroup_plot = plot_double_bar(
            unit_daily_cost,
            daily_cost,
            "unitxgroup_plot",
            "Consumo de Unidade x Grupo de Dispositivos",
            "Dispositivos",
            "Gasto Enegético em R$",
        )

        data = {
            "daily_cost": total_daily_cost,
            "periodic_cost": total_periodic_cost,
            "periodic_plot": periodic_plot["path"],
            "unitxgroup_plot": unitxgroup_plot["path"],
        }

        print(data)

        return JsonResponse({"status": "OK"})
    return JsonResponse({"error": "Bad request"}, status=405)
