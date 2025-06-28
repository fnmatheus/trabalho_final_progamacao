// função que cria cada celula da tabela e criar os elementos dela
function deviceInfoCell(device, type) {
    const tdCell = document.createElement("td");
    
    const cellValue = document.createElement("input");
    cellValue.value = device[type];
    
    if (type != "name") {
        cellValue.type = "number"
        cellValue.min = "0"
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
    deleteBtn.textContent = "🗑️"
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
        { name: "Computador", amount: 40, averagePower: 145, usageTime: 9 },
        { name: "Impressora 3D", amount: 3, averagePower: 220, usageTime: 4 },
        { name: "Estação de solda", amount: 2, averagePower: 95, usageTime: 3 },
        { name: "Osciloscópio", amount: 4, averagePower: 60, usageTime: 2 },
        { name: "Ar-condicionado", amount: 1, averagePower: 1350, usageTime: 8 }
    ];

    const tableBody = document.querySelector("#devices-table tbody");

    devices.forEach((device) => {
        const line = deviceLineCreator(device);

        tableBody.appendChild(line);
    })
}

// função responsável por alterar a visibilidade do formulario de adicionar novo dispositivo
function addDeviceFormDisplay(stats) {
    const addDeviceFormDiv = document.getElementById("device-form");
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

    addDeviceFormDisplay('none');
    alert("Novo dispositivo adicionado!")
});

initDevicesTable();