// função responsável por iniciar a tabela de dispositivos ja pre definida
function deviceAmountSettings(device) {
    const tdAmount = document.createElement("td");

    const amountValue = document.createElement("span");
    amountValue.textContent = device.amount;
    
    const btnMinus = document.createElement("button");
    btnMinus.textContent = "-";
    btnMinus.onclick = () => {
        if (amountValue.textContent > 0) {
            amountValue.textContent = parseInt(amountValue.textContent) - 1;
        }
    }

    const btnPlus = document.createElement("button");
    btnPlus.textContent = "+";
    btnPlus.onclick = () => {
        amountValue.textContent = parseInt(amountValue.textContent) + 1;
    }

    tdAmount.append(btnMinus, amountValue, btnPlus);

    return tdAmount;
}

function initDevicesTable() {
    const devices = [
        { name: "Device 1", amount: 2, consumption: 150 },
        { name: "Device 2", amount: 1, consumption: 300 }
    ];

    const tableBody = document.querySelector("#devices-table tbody");

    devices.forEach((device) => {
        const line = document.createElement("tr");

        const tdName = document.createElement("td");
        const tdConsumption = document.createElement("td");

        tdName.textContent = device.name;
        tdAmount = deviceAmountSettings(device);
        tdConsumption.textContent = device.consumption;

        line.append(tdName, tdAmount, tdConsumption);

        tableBody.appendChild(line);
    })
}

initDevicesTable();