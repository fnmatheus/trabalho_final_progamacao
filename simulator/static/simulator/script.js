function initDevicesTable() {
    const devices = [
        { name: "Device 1", amount: 2, consumption: 150 },
        { name: "Device 2", amount: 1, consumption: 300 }
    ];

    const tableBody = document.querySelector("#devices-table tbody");

    devices.forEach((device) => {
        const line = document.createElement("tr");

        const tdName = document.createElement("td");
        const tdAmount = document.createElement("td");
        const tdConsumption = document.createElement("td");

        tdName.textContent = device.name;
        tdAmount.textContent = device.amount;
        tdConsumption.textContent = device.consumption;

        line.append(tdName, tdAmount, tdConsumption);

        tableBody.appendChild(line);
    })
}

initDevicesTable();