<p align="center">
  <img src="./simulator/static/simulator/logo.svg" height="100"/>
</p>
<h1 align="center">⚡ ECS</h1>
<h2 align="center">Simulador de Consumo Energético</h2>

<h4 align="center"> 
	🚧 ECS 🚀 Em construção... 🚧
</h4>

Tabela de conteúdos
=================
<!--ts-->
  * [Sobre o projeto](#sobre-o-projeto)
  * [Funcionalidades](#funcionalidades)
  * [Tecnologias](#tecnologias)
  * [Passo a passo para executar o projeto](#passo-a-passo-para-executar-o-projeto)
  * [Metodologia](#metodologia)
  * [Autor](#autor)
  * [Licença](#licença)
<!--te-->

## 💻 Sobre o projeto

⚡ ECS - Este projeto tem como objetivo simular e analisar o consumo de energia elétrica em um laboratório de engenharia, considerando o uso de diversos equipamentos ao longo de uma semana. Embora a proposta original tenha sido pensada para ser desenvolvida em um ambiente Jupyter Notebook, o projeto foi adaptado para ser implementado como uma aplicação web utilizando o framework Django. A aplicação permite cadastrar os equipamentos do laboratório, simular seu uso diário, calcular automaticamente o consumo energético e o custo total ao longo dos dias, além de exibir os resultados por meio de gráficos interativos. Com isso, a solução oferece uma experiência mais prática, dinâmica e próxima de aplicações reais de monitoramento energético em ambientes acadêmicos e corporativos.

---

## ⚙️ Funcionalidades

O sistema desenvolvido em Django oferece uma interface web completa para simulação e análise do consumo de energia em um laboratório. As principais funcionalidades incluem:

- 🔧 **Cadastro de Equipamentos**  
  Permite registrar equipamentos do laboratório com informações como nome, potência média (W), horas de uso diário e custo da energia (R$/kWh).

- ✏️ **Edição e Remoção de Equipamentos**  
  Equipamentos cadastrados podem ser editados ou removidos diretamente pela interface.

- 📅 **Definição do Período da Simulação**  
  O usuário pode selecionar a quantidade de dias a serem simulados (mínimo de 1 dia), tornando o sistema flexível para análises semanais, mensais ou personalizadas.

- 🔄 **Simulação do Consumo de Energia por Equipamento**  
  O sistema calcula o consumo total de energia (em kWh) de cada equipamento ao longo de todo o período definido, com base em sua potência e tempo de uso diário.

- 💰 **Cálculo do Custo Total de Energia**  
  Com base no consumo total e no custo do kWh informado, o sistema calcula o gasto de energia para cada equipamento e para o laboratório como um todo.

- 📊 **Visualização Gráfica dos Dados**  
  Geração de gráficos com o consumo por equipamento, custo total por dia e comparação entre os dias simulados utilizando a biblioteca Matplotlib.

- 🌐 **Interface Web Amigável**  
  Todo o processo é realizado por meio de uma interface intuitiva, desenvolvida com Django, que facilita o uso mesmo por usuários sem conhecimento técnico avançado.

---

## 🚀 Passo a Passo para Executar o Projeto

Siga as etapas abaixo para instalar as dependências e executar o projeto localmente:

### 1. 📦 Clonar o Repositório
Clone o projeto para sua máquina:

- git clone https://github.com/fnmatheus/trabalho_final_progamacao.git
- cd trabalho_final_progamacao

### 2. 🐍 Criar e Ativar o Ambiente Conda
Crie um novo ambiente Conda com base no arquivo `ambiente.yml`:

- conda env create -f ambiente.yml

Ative o ambiente Conda:

- conda activate trabalho-final

> Substitua `trabalho-final` pelo nome definido no seu `ambiente.yml`, caso seja diferente.

### 3. ▶️ Iniciar o Servidor Django
Execute o servidor local com o seguinte comando:

- python manage.py runserver

### 4. 🌐 Acessar o Sistema no Navegador
Abra o navegador e acesse:

- http://127.0.0.1:8000/

Pronto! Agora você pode simular o consumo de energia dos equipamentos, analisar os resultados e visualizar os gráficos diretamente pela interface web.

---

## 🧪 Metodologia

O projeto foi desenvolvido utilizando o framework Django para criação de uma aplicação web capaz de simular e analisar o consumo de energia em um laboratório de engenharia.

A metodologia adotada inclui as seguintes etapas:

1. **Modelagem dos dados:**  
   Os equipamentos do laboratório foram representados por modelos Django contendo atributos essenciais como potência média (W), horas diárias de uso e custo do kWh, que é informado pelo usuário.

2. **Simulação do consumo:**  
   A aplicação calcula o consumo total de energia para cada equipamento ao longo do período definido pelo usuário, multiplicando potência pelo tempo de uso e número de dias simulados.

3. **Cálculo do custo:**  
   Com base no consumo e no valor do kWh fornecido pelo usuário, o sistema calcula o custo total de energia para cada equipamento e para o laboratório como um todo.

4. **Visualização dos resultados:**  
   Foram gerados gráficos dinâmicos utilizando as bibliotecas NumPy e Matplotlib para representar o consumo e custo de forma clara e visual, facilitando a análise.

5. **Interface amigável:**  
   Todo o fluxo foi implementado com uma interface web simples e intuitiva, permitindo que usuários possam cadastrar equipamentos, definir o período da simulação e visualizar os resultados sem necessidade de conhecimentos técnicos.

6. **Estruturação do projeto:**  
   O código foi organizado em funções e módulos para facilitar a manutenção e possíveis expansões futuras.

Essa metodologia garantiu a entrega de um sistema funcional, flexível e de fácil utilização para análise energética em ambientes acadêmicos.

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Back-end**  ([Django](https://www.djangoproject.com/)  +  [Python](https://www.python.org/))

#### **Front-end**  ([HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML)  +  [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS))

#### **Utilitários**

-   Bibliotecas:  **[NumPy](https://numpy.org/)**, **[Matplotlib](https://matplotlib.org/)**
-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Ícones:  **[Heroicons](https://heroicons.com/)**
-   Fontes:  **[Inter](https://fonts.google.com/specimen/Inter)**

---

## 🙋‍♂️ Autor

<a href="https://github.com/fnmatheus">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/100846027?v=4" width="100px;" alt=""/>
 <br />
 <p>Matheus Nascimento</p>
 <br />
</a>

[![Linkedin Badge](https://img.shields.io/badge/-Matheus-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/fnmatheus/)](https://www.linkedin.com/in/fnmatheus/) 
[![Gmail Badge](https://img.shields.io/badge/-nasc.matheusfrancisco@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:nasc.matheusfrancisco@gmail.com)](mailto:nasc.matheusfrancisco@gmail.com)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito por Matheus Nascimento 👋🏽 [Entre em contato!](https://www.linkedin.com/in/fnmatheus/)

---
