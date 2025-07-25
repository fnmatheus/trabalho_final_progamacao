// função que cria cada celula da tabela e criar os elementos dela
function deviceInfoCell(device, type) {
  const tdCell = document.createElement("td");

  const cellValue = document.createElement("input");
  cellValue.value = device[type];

  if (type != "name") {
    cellValue.type = "number";
    cellValue.min = "0";
  }

  tdCell.append(cellValue);

  return tdCell;
}

// código responsável por criar uma linha da tabela
function deviceLineCreator(device) {
  const line = document.createElement("tr");

  const tdName = deviceInfoCell(device, "name");
  const tdAmount = deviceInfoCell(device, "amount");
  const tdAveragePower = deviceInfoCell(device, "averagePower");
  const tdUsageTime = deviceInfoCell(device, "usageTime");

  const tdDelete = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  `;
  deleteBtn.onclick = () => {
    const auth = confirm("Tem certeza que deseja remover este dispositivo?");
    if (auth) {
      line.remove();
    }
  };
  tdDelete.appendChild(deleteBtn);

  line.append(tdName, tdAmount, tdAveragePower, tdUsageTime, tdDelete);

  return line;
}

// função responsável por iniciar a tabela de dispositivos ja pre definida
function initDevicesTable() {
  const devices = [
    {name: "Computador", amount: 40, averagePower: 145, usageTime: 9},
    {name: "Impressora 3D", amount: 3, averagePower: 220, usageTime: 4},
    {name: "Estação de solda", amount: 2, averagePower: 95, usageTime: 3},
    {name: "Osciloscópio", amount: 4, averagePower: 60, usageTime: 2},
    {name: "Ar-condicionado", amount: 1, averagePower: 1350, usageTime: 8},
  ];

  const tableBody = document.querySelector("#devices-table tbody");

  devices.forEach((device) => {
    const line = deviceLineCreator(device);

    tableBody.appendChild(line);
  });
}

// função responsável por alterar a visibilidade de um container
function changeDisplayStats(stats, id) {
  const addDeviceFormDiv = document.getElementById(id);
  addDeviceForm.reset();
  addDeviceFormDiv.style.display = stats;
}

// trecho do código para adicionar novo dispositivo na tabela
const addDeviceForm = document.querySelector("#device-form form");
addDeviceForm.addEventListener("submit", (event) => {
  // previne que ao submeter o formulario faça alguma coisa indesejada
  event.preventDefault();

  const tableBody = document.querySelector("#devices-table tbody");

  const data = new FormData(addDeviceForm);

  const deviceInfo = {
    name: data.get("name"),
    amount: data.get("amount"),
    averagePower: data.get("averagePower"),
    usageTime: data.get("usageTime"),
  };

  const newLine = deviceLineCreator(deviceInfo);
  tableBody.appendChild(newLine);

  addDeviceFormDisplay("none");
  alert("Novo dispositivo adicionado!");
});

// função responsável por pegar os dados na tabela para a simulação
function getTableData(query) {
  const tableBody = document.querySelector(query);
  const rows = tableBody.querySelectorAll("tr");

  const devices = [];

  rows.forEach((row) => {
    const inputs = row.querySelectorAll("input");

    const device = {
      name: inputs[0].value,
      amount: parseInt(inputs[1].value),
      averagePower: parseFloat(inputs[2].value),
      usageTime: parseFloat(inputs[3].value),
    };

    devices.push(device);
  });

  return devices;
}

// função necessária para fazer o fetch para o backend
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// função para limpar os dados da função anterior antes de criar uma nova
function clearSimulation() {
  const totalCost = document.getElementById("total-cost");
  totalCost.removeChild(totalCost.lastChild);

  const dailyCost = document.getElementById("daily-cost");
  dailyCost.removeChild(dailyCost.lastChild);

  const totalConsume = document.getElementById("total-consume");
  totalConsume.removeChild(totalConsume.lastChild);

  const dailyConsume = document.getElementById("daily-consume");
  dailyConsume.removeChild(dailyConsume.lastChild);

  const plotsContainer = document.getElementById("plots-images");
  plotsContainer.innerHTML = "";

  const counterHTML = document.getElementById("image-counter");
  counterHTML.innerHTML = "1";

  const consumeTable = document.querySelector("#consume-table tbody");
  consumeTable.innerHTML = "";
}

// função para adicionar dados da informations
function setSimulationInfo(data) {
  // adicionar custo total
  const totalCost = document.getElementById("total-cost");

  const totalCostValue = document.createElement("span");
  totalCostValue.innerHTML = data.periodic_cost;

  totalCost.appendChild(totalCostValue);

  // adicionar custo diario
  const dailyCost = document.getElementById("daily-cost");

  const dailyCostValue = document.createElement("span");
  dailyCostValue.innerHTML = data.daily_cost;

  dailyCost.appendChild(dailyCostValue);

  // adicionar consumo total
  const totalConsume = document.getElementById("total-consume");

  const totalConsumeValue = document.createElement("span");
  totalConsumeValue.innerHTML = `${data.total_consume} kWh`;

  totalConsume.appendChild(totalConsumeValue);

  // adicionar consumo diario
  const dailyConsume = document.getElementById("daily-consume")

  const dailyConsumeValue = document.createElement("span");
  dailyConsumeValue.innerHTML = `${data.total_daily_consume} kWh`;
  
  dailyConsume.appendChild(dailyConsumeValue);
}

// função que cria cada celula da tabela e criar os elementos dela
function consumeInfoCell(device, type) {
  const tdCell = document.createElement("td");
  tdCell.innerHTML = device[type];

  return tdCell;
}

// código responsável por criar uma linha da tabela
function consumeLineCreator(device) {
  const line = document.createElement("tr");

  const tdName = consumeInfoCell(device, "name");
  const tdConsume = consumeInfoCell(device, "consume");

  line.append(tdName, tdConsume);

  return line;
}

// função para adicionar items na tabela de consumo
function createConsumeTable(devices) {
  console.log(devices);
  const tableBody = document.querySelector("#consume-table tbody");

  devices.forEach((device) => {
    const line = consumeLineCreator(device);

    tableBody.appendChild(line);
  })
}

// função para adicionar os graficos da função
function setSimulationPlots(data) {
  // adicionar imagens dos graficos
  const plotsContainer = document.getElementById("plots-images");

  const dailyCostPlot = document.createElement("img");
  dailyCostPlot.id = "plot-1";
  dailyCostPlot.style = "display: block";
  dailyCostPlot.src = `data:image/png;base64,${data.daily_cost_plot}`;

  const periodicCostPlot = document.createElement("img");
  periodicCostPlot.id = "plot-2";
  periodicCostPlot.style = "display: none";
  periodicCostPlot.src = `data:image/png;base64,${data.periodic_plot}`;

  const unitxgroupCostPlot = document.createElement("img");
  unitxgroupCostPlot.id = "plot-3";
  unitxgroupCostPlot.style = "display: none";
  unitxgroupCostPlot.src = `data:image/png;base64,${data.unitxgroup_plot}`;

  plotsContainer.append(dailyCostPlot, periodicCostPlot, unitxgroupCostPlot);
}

// função para adicionar os items da simulação
function setSimulation(data) {
  const { periodic_consume: devices } = data;

  //adiciona as informações da simulação
  setSimulationInfo(data);

  // cria e adiciona a tabela de consumo na simulação
  createConsumeTable(devices);

  // adiciona os gráficos da simulação
  setSimulationPlots(data);
}

// função principal para enviar os dados da simulação para o backend
async function startSimulation() {
  clearSimulation();

  changeDisplayStats("block", "simulation-window");

  const powerCost = document.getElementById("power-cost").value;
  const days = document.getElementById("days").value;
  const devices = getTableData("#devices-table tbody");

  const data = {
    powerCost,
    days,
    devices,
  };

  const request = await fetch("/simulate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(data),
  });

  const response = await request.json();

  changeDisplayStats("none", "loading-container")
  changeDisplayStats("flex", "simulation-section")

  setSimulation(response.data)
}

// Função para fechamento da simulação

function closeSimulation() {
  changeDisplayStats('none', 'simulation-window')
  changeDisplayStats('none', 'simulation-section')
  changeDisplayStats('flex', 'loading-container')
}

// Função para alternar entre as imagens

function changePlot(type) {
  const counterHTML = document.getElementById('image-counter');
  const counterValue = Number(counterHTML.innerHTML);

  if (type == "-" && counterValue > 1) {
    document.getElementById(`plot-${counterValue}`).style.display = "none";
    document.getElementById(`plot-${counterValue - 1}`).style.display = "block";
    counterHTML.innerHTML = counterValue - 1;
  } else if (type == "+" && counterValue < 3) {
    document.getElementById(`plot-${counterValue}`).style.display = "none";
    document.getElementById(`plot-${counterValue + 1}`).style.display = "block";
    counterHTML.innerHTML = counterValue + 1;
  }
}

// executa a função de iniciar os devices ao abrir a página
initDevicesTable();
