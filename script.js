let employees = JSON.parse(localStorage.getItem('employees')) || [];

function checkPassword() {
    // Solicita a senha
    const password = prompt("Digite a senha:");
    
    // Verifica se a senha está correta
    if (password !== "FC45@") {
        alert("Senha incorreta!");
        window.location.href = "https://www.google.com"; // Redireciona se a senha estiver incorreta
    } else {
        // Mostra o conteúdo e o botão para alternar a lista
        document.getElementById('content').style.display = 'block';
        document.getElementById('employeeEntries').style.display = 'none'; // Inicialmente, lista de funcionários escondida
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
    displayEmployees(); // Atualiza a lista após adicionar um novo funcionário
}

function searchEmployee() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(searchValue));

    // Se houver resultados, exibe a lista de funcionários
    if (filteredEmployees.length > 0) {
        document.getElementById("employeeEntries").style.display = "block";
    } else {
        document.getElementById("employeeEntries").style.display = "none"; // Oculta a lista se não houver resultados
    }

    displayEmployees(filteredEmployees); // Exibe apenas os funcionários filtrados
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees)); // Atualiza o localStorage
    displayEmployees(); // Atualiza a lista após a exclusão
}

function displayEmployees(filteredEmployees = employees) {
    const employeeEntries = document.getElementById("employeeEntries");
    employeeEntries.innerHTML = ''; // Limpa a lista antes de exibir os dados atualizados

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

// Inicializa a lista como oculta ao carregar a página
window.onload = function() {
    document.getElementById("content").style.display = "none"; // Oculta o conteúdo inicialmente
    document.getElementById("employeeEntries").style.display = "none"; // Oculta a lista inicialmente
    checkPassword(); // Chama a verificação de senha ao carregar a página
};
