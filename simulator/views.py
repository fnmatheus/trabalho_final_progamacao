from django.shortcuts import render

def home(request):
    return render(request, "simulator/home.html")
