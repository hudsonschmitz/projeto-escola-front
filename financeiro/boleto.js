function loadBoleto() {
    limpaTabela();
    let matricula = document.getElementById('matricula').value;
    fetch('http://localhost:3333/boleto/' + matricula)
        .then(response => response.json())
        .then(data => preencheTabela(data));
}

function preencheTabela(dados) {
    console.log(dados)
    const tbody = document.getElementById('tableBody');
    for(i = 0; i < dados.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = dados[i].matricula;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].aluno;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].situacao;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].ano;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].valor;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].ativExtra;
        tr.appendChild(td);
        td = document.createElement('td');
        buttonImprimir = document.createElement('button');
        buttonImprimir.innerHTML = 'Imprimir';
        td.appendChild(buttonImprimir);
        buttonImprimir.onclick = () => alertBoleto();
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

function limpaTabela() {
    let tbBody = document.getElementById('tableBody');
    tbBody.parentNode.removeChild(tbBody);

    let tBodyNew = document.createElement('tbody');
    let tabela = document.getElementById('tabelaPrinc');
    
    tBodyNew.setAttribute('id', 'tableBody');
    tabela.appendChild(tBodyNew);
}

function alertBoleto() {
    window.alert('Boleto disponivel para download!')
}