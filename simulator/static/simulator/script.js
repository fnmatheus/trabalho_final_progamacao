// função responsável por iniciar a tabela de dispositivos ja pre definida
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

function initDevicesTable() {
    const devices = [
        { name: "Computador", amount: 40, averagePower: 145, usageTime: 9 },
        { name: "Impressora 3D", amount: 3, averagePower: 220, usageTime: 4 },
        { name: "Estação de solda", amount: 2, averagePower: 95, usageTime: 3 },
        { name: "Osciloscópio", amount: 4, averagePower: 60, usageTime: 2 },
        { name: "Ar-condicionado", amount: 1, averagePower: 1350, usageTime: 8 }
    ];

    const tableBody = document.querySelector("#devices-table tbody");

    devices.forEach((device, i) => {
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

        tableBody.appendChild(line);
    })
}

function addDeviceFormDisplay(stats) {
    addDeviceForm = document.getElementById("device-form");
    addDeviceForm.style.display = stats;
}

initDevicesTable();