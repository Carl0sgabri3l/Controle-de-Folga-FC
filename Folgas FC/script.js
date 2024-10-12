let records = JSON.parse(localStorage.getItem('records')) || [];

function addRecord() {
    const name = document.getElementById('employeeName').value.trim();
    const leaveType = document.getElementById('leaveType').value.trim();
    const dayOfWeek = document.getElementById('leaveDayOfWeek').value.trim();
    const day = document.getElementById('leaveDay').value;
    const month = document.getElementById('leaveMonth').value;

    if (!name || !leaveType || !dayOfWeek) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    const record = { name, leaveType, dayOfWeek, day, month };
    records.push(record);
    localStorage.setItem('records', JSON.stringify(records));

    clearInputs();
    renderRecords();
    renderHolidayEmployees();
}

function renderRecords(filter = '') {
    const employeeEntries = document.getElementById('employeeEntries');
    employeeEntries.innerHTML = '';
    const filteredRecords = records.filter(record => record.name.toLowerCase().includes(filter.toLowerCase()));
    
    filteredRecords.forEach((record, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${record.name} - ${record.leaveType} - ${record.dayOfWeek}${record.day ? ' - ' + record.day + '/' + record.month : ''}`;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => deleteRecord(index);

        li.appendChild(deleteButton);
        employeeEntries.appendChild(li);
    });
}

function renderHolidayEmployees() {
    const holidayEntries = document.getElementById('holidayEntries');
    holidayEntries.innerHTML = '';

    // Agrupando funcionários que trabalharam em feriados
    const holidayCount = {};

    records.forEach(record => {
        if (record.leaveType.toLowerCase() === 'feriado') {
            if (!holidayCount[record.name]) {
                holidayCount[record.name] = 0;
            }
            holidayCount[record.name]++;
        }
    });

    for (const [name, count] of Object.entries(holidayCount)) {
        if (count >= 1 && count <= 2) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${name} - Trabalhou em ${count} feriado(s)`;
            holidayEntries.appendChild(li);
        }
    }
}

function deleteRecord(index) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    renderRecords();
    renderHolidayEmployees();
}

function searchEmployee() {
    const searchValue = document.getElementById('searchInput').value.trim();
    renderRecords(searchValue);
}

function clearInputs() {
    document.getElementById('employeeName').value = '';
    document.getElementById('leaveType').value = '';
    document.getElementById('leaveDayOfWeek').value = '';
    document.getElementById('leaveDay').value = '';
    document.getElementById('leaveMonth').value = '';
}

// Renderiza os registros ao carregar a página
renderRecords();
renderHolidayEmployees();
