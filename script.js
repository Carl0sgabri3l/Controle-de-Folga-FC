let employees = [];

function checkPassword() {
    const password = prompt("Digite a senha:");
    if (password !== "FC45@") {
        alert("Senha incorreta!");
        window.location.href = "https://www.google.com"; // Redireciona para outro site
    } else {
        document.getElementById('content').style.display = 'block'; // Mostra o conteúdo se a senha estiver correta
    }
}

function addRecord() {
    const name = document.getElementById("employeeName").value;
    const leaveType = document.getElementById("leaveType").value;
    const leaveDayOfWeek = document.getElementById("leaveDayOfWeek").value;
    const leaveDay = document.getElementById("leaveDay").value;
    const leaveMonth = document.getElementById("leaveMonth").value;

    const employee = { name, leaveType, leaveDayOfWeek, leaveDay, leaveMonth };
    employees.push(employee);
    displayEmployees();
    displayHolidayEmployees();

    // Limpar os campos após adicionar
    document.getElementById("employeeName").value = '';
    document.getElementById("leaveType").value = '';
    document.getElementById("leaveDayOfWeek").value = '';
    document.getElementById("leaveDay").value = '';
    document.getElementById("leaveMonth").value = '';
}

function displayEmployees(filteredEmployees = employees) {
    const employeeEntries = document.getElementById("employeeEntries");
    employeeEntries.innerHTML = '';

    filteredEmployees.forEach((employee, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <strong>${employee.name}</strong> - ${employee.leaveType} - ${employee.leaveDayOfWeek}
            ${employee.leaveDay ? ` - Dia: ${employee.leaveDay}` : ''}
            ${employee.leaveMonth ? ` - Mês: ${employee.leaveMonth}` : ''}
            <button class="btn btn-danger btn-sm float-right" onclick="deleteEmployee(${index})">Excluir</button>
        `;
        employeeEntries.appendChild(listItem);
    });
}

function searchEmployee() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchValue)
    );
    displayEmployees(filteredEmployees);
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees();
    displayHolidayEmployees();
}

function displayHolidayEmployees() {
    const holidayEntries = document.getElementById("holidayEntries");
    holidayEntries.innerHTML = '';

    const holidayCount = {};

    employees.forEach(employee => {
        if (employee.leaveType.toLowerCase() === 'feriado') {
            holidayCount[employee.name] = (holidayCount[employee.name] || 0) + 1;
        }
    });

    Object.keys(holidayCount).forEach(name => {
        if (holidayCount[name] <= 2) {
            const employee = employees.find(emp => emp.name === name && emp.leaveType.toLowerCase() === 'feriado');
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <strong>${name}</strong> - Feriado - ${employee.leaveDayOfWeek}
                ${employee.leaveDay ? ` - Dia: ${employee.leaveDay}` : ''}
                ${employee.leaveMonth ? ` - Mês: ${employee.leaveMonth}` : ''}
                <button class="btn btn-danger btn-sm float-right" onclick="deleteEmployee(${employees.indexOf(employee)})">Excluir</button>
            `;
            holidayEntries.appendChild(listItem);
        }
    });
}

