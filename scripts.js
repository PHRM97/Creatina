document.getElementById('creatinaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const registro = { date, time, checked: false };

    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));

    atualizarLista();
});

function atualizarLista() {
    const registroList = document.getElementById('registroList');
    registroList.innerHTML = '';

    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.forEach((registro, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="info">
                <span>Data: ${registro.date}</span>
                <span>Hora: ${registro.time}</span>
            </div>
            <input type="checkbox" class="check" ${registro.checked ? 'checked' : ''} onchange="toggleCheck(${index})">
        `;
        registroList.appendChild(listItem);
    });
}

function toggleCheck(index) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros[index].checked = !registros[index].checked;
    localStorage.setItem('registros', JSON.stringify(registros));
    atualizarLista();
}

window.onload = atualizarLista;