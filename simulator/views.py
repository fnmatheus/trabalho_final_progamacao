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


# Caminho no qual os graficos devem ser salvos
path = "simulator/static/simulator/plots/"


# Função para gerar o gráfico de visão geral dos gastos
def plot_daily_cost_value(daily_cost, total_daily_cost, days, name):
    days_range = list(range(1, days + 1))

    # cria uma lista com o nome e outra lista de listas com cada gasto diario
    # de forma acumulativa soma o dia anterior
    names = [device["name"] for device in daily_cost]
    costs = [device["cost"] for device in daily_cost]
    cumulative_daily_cost = [
        [round(cost * day, 2) for day in days_range] for cost in costs
    ]

    # cria uma lista que forma uma lista acumula o valor do dia anterior
    cumulative_total_cost = [
        round(total_daily_cost * day, 2) for day in days_range
    ]

    plt.figure(figsize=(16, 9))

    for i, cost in enumerate(cumulative_daily_cost):
        plt.plot(days_range, cost, label=names[i])

    plt.plot(days_range, cumulative_total_cost, label="Total")

    plt.xlabel("Período em dias")
    plt.ylabel("Gasto Enegético em R$")
    plt.title("Custo diário")
    plt.legend()

    plt.savefig(f"{path}{name}.svg", dpi=300, bbox_inches='tight')
    plt.close()

    return {"path": f"{path}{name}.svg"}


# Função responsável em gerar o gráfico de barra única
def plot_simple_bar(devices, name, days):
    names = [device["name"] for device in devices]
    costs = [device["cost"] for device in devices]

    plt.figure(figsize=(16, 9))

    plt.bar(names, costs, color="#ff9900")

    plt.xlabel("Dispositivos")
    plt.ylabel("Gasto Enegético em R$")
    plt.title(f"Consumo em {days} dias por dispositivo")

    plt.savefig(f"{path}{name}.svg", dpi=300, bbox_inches='tight')
    plt.close()

    return {"path": f"{path}{name}.svg"}


# Função responsável em gerar o gráfico de barra duplas para comparação
def plot_double_bar(units, groups, name):
    names = [device["name"] for device in units]
    units_costs = [device["cost"] for device in units]
    groups_costs = [device["cost"] for device in groups]

    x_position = np.arange(len(names))
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

    plt.xticks(x_position, names)
    plt.xlabel("Dispositivos")
    plt.ylabel("Gasto Enegético em R$")
    plt.title("Consumo de Unidade x Grupo de Dispositivos")
    plt.legend()

    plt.savefig(f"{path}{name}.svg", dpi=300, bbox_inches='tight')
    plt.close()

    return {"path": f"{path}{name}.svg"}


# Função principal da simulação de gastos
# Está função utiliza as outras funções e reuni todos os dados necessários
# Dá o retorno para o frontend
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

        daily_cost_plot = plot_daily_cost_value(
            daily_cost,
            total_daily_cost,
            days,
            "daily_cost_plot"
        )

        periodic_plot = plot_simple_bar(
            periodic_cost,
            "periodic_cost_plot",
            days,
        )

        unitxgroup_plot = plot_double_bar(
            unit_daily_cost,
            daily_cost,
            "unitxgroup_plot",
        )

        data = {
            "daily_cost": total_daily_cost,
            "periodic_cost": total_periodic_cost,
            "daily_cost_plot": daily_cost_plot["path"],
            "periodic_plot": periodic_plot["path"],
            "unitxgroup_plot": unitxgroup_plot["path"],
        }

        print(data)

        return JsonResponse({"status": "OK"})
    return JsonResponse({"error": "Bad request"}, status=405)
