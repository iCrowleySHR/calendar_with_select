const daySelect = document.getElementById('daySelect');
const calendar = document.getElementById('calendar');
const monthTitle = document.getElementById('monthTitle');

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function gerarDiasDoMes() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const diaHoje = hoje.getDate();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    monthTitle.textContent = `Calendário - ${nomesMeses[mes]} ${ano}`;


    daySelect.innerHTML = '';
    for (let i = diaHoje; i <= ultimoDia; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    desenharCalendario(primeiroDia, ultimoDia, diaHoje);
}

function desenharCalendario(inicioSemana, totalDias, diaSelecionado) {
    calendar.innerHTML = '';

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const diaAtual = hoje.getDate();

    for (let i = 0; i < 7; i++) {
        const dia = document.createElement('div');
        dia.className = 'weekday';
        dia.textContent = diasSemana[i];
        calendar.appendChild(dia);
    }

    for (let i = 0; i < inicioSemana; i++) {
        const vazio = document.createElement('div');
        vazio.className = 'day empty';
        calendar.appendChild(vazio);
    }

    for (let i = 1; i <= totalDias; i++) {
        const dia = document.createElement('div');
        dia.className = 'day';
        dia.textContent = i;

        if (i < diaAtual) {
            dia.classList.add('past');
        } else {
            dia.dataset.dia = i;


            dia.addEventListener('click', () => {
                daySelect.value = i;
                daySelect.dispatchEvent(new Event('change'));
            });

            if (i === Number(daySelect.value)) {
                dia.classList.add('highlight');
            }
        }

        calendar.appendChild(dia);
    }
}


daySelect.addEventListener('change', () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    desenharCalendario(primeiroDia, ultimoDia, Number(daySelect.value));
});

gerarDiasDoMes();