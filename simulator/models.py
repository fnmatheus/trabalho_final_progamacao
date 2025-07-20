from django.db import models


class SimulationResult(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    daily_cost = models.FloatField()
    periodic_cost = models.FloatField()
    total_daily_consume = models.FloatField()
    total_consume = models.FloatField()

    # Campos JSON para listas
    periodic_consume = models.JSONField()

    # Base64 das imagens
    daily_cost_plot = models.TextField()
    periodic_plot = models.TextField()
    unitxgroup_plot = models.TextField()

    def __str__(self):
        return f"Simulação em {self.created_at} - Total R${self.periodic_cost}"
