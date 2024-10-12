let employees = JSON.parse(localStorage.getItem('employees')) || [];

function checkPassword() {
    const password = prompt("Digite a senha:");
    if (password !== "FC45@") {
        alert("Senha incorreta!");
        window.location.href = "https://www.google.com"; // Redireciona para outro site
    } else {
        document.getElementById('content').style.display = 'block'; // Mostra o conteúdo se a senha estiver correta
        displayEmployees(); // Garante que os registros sejam exibidos após o login
        displayHolidayEmployees(); // Exibe os funcionários que trabalharam em feriados
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
    localStorage.setItem('employees', JSON.stringify(employees)); // Salva no localStorage
    displayEmployees();
    displayHolidayEmployees();
}

function searchEmployee() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(searchValue));
    displayEmployees(filteredEmployees);
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees)); // Atualiza o localStorage
    displayEmployees();
    displayHolidayEmployees();
}

function deleteHolidayEmployee(index) {
    const holidayEmployees = employees.filter(employee => employee.leaveType.toLowerCase() === 'feriado');
    const actualIndex = employees.indexOf(holidayEmployees[index]);
    employees.splice(actualIndex, 1);
    localStorage.setItem('employees', JSON.stringify(employees)); // Atualiza o localStorage
    displayHolidayEmployees();
    displayEmployees();
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

function displayHolidayEmployees(filteredEmployees = employees.filter(employee => employee.leaveType.toLowerCase() === 'feriado')) {
    const holidayEntries = document.getElementById("holidayEntries");
    holidayEntries.innerHTML = '';

    filteredEmployees.forEach((employee, index) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <strong>${employee.name}</strong> - ${employee.leaveType} - ${employee.leaveDayOfWeek}
            ${employee.leaveDay ? ` - Dia: ${employee.leaveDay}` : ''}
            ${employee.leaveMonth ? ` - Mês: ${employee.leaveMonth}` : ''}
            <button class="btn btn-danger btn-sm float-right" onclick="deleteHolidayEmployee(${index})">Excluir</button>
        `;
        holidayEntries.appendChild(listItem);
    });
}
