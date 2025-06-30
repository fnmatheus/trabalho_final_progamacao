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

// Código responsável por criar uma linha da tabela
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

// função responsável por alterar a visibilidade do formulario de adicionar novo dispositivo
function addDeviceFormDisplay(stats) {
  const addDeviceFormDiv = document.getElementById("device-form");
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

async function startSimulation() {
  const powerCost = document.getElementById("power-cost-value").value;
  const devices = getTableData("#devices-table tbody");

  const data = {
    powerCost,
    devices,
  };

  const response = await fetch("/simulate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(data),
  });
}

// executa a função de iniciar os devices ao abrir a página
initDevicesTable();
