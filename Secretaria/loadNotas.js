function loadNotas() {
    limpaTabela();
    let turma = document.getElementById('turma').value;
    turma = turma.replace(' ', '');
    fetch('http://localhost:3333/notas/' + turma)
        .then(response => response.json())
        .then(data => preencheTabela(data));
}

function preencheTabela(dados) {
    console.log(dados);
    const tbody = document.getElementById('tableBody');
    for(i = 0; i < dados.length; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = dados[i].matricula;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].materia;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].professor;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].aluno;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].turmaAno;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].nota;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].faltas;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].totalAulas;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = dados[i].situacao;
        if(td.innerHTML == 'Reprovado') {
            td.classList.add('red')
        }
        tr.appendChild(td);
        td = document.createElement('td');
        buttonEditar = document.createElement('button');
        buttonEditar.innerHTML = 'Editar';
        buttonEditar.classList.add('btn');
        buttonEditar.classList.add('btn-warning');
        td.appendChild(buttonEditar);
        let matricula = dados[i].matricula;
        buttonEditar.onclick = () => editarNotaFalta(matricula);
        tr.appendChild(td);
        buttonExcluir = document.createElement('button');
        buttonExcluir.innerHTML = 'Excluir';
        buttonExcluir.classList.add('btn');
        buttonExcluir.classList.add('btn-primary');
        buttonExcluir.onclick = () => excluirNota(matricula);
        td = document.createElement('td');
        td.appendChild(buttonExcluir);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

function excluirNota(matricula) {
    fetch('http://localhost:3333/notas/aluno/' + matricula, {
         method: 'DELETE',
        })
            .then(res => loadNotas());
    
}

function editarNotaFalta (matricula) {
    var nota = prompt("Digite a nota :");
    var falta = prompt("Digite as faltas:");
    console.log(nota);
    fetch(`http://localhost:3333/notas/aluno/${matricula}/${nota}/${falta} ` , {
         method: 'PUT'
        }).then(res => loadNotas());
    

}


function limpaTabela() {
    let tbBody = document.getElementById('tableBody');
    tbBody.parentNode.removeChild(tbBody);

    let tBodyNew = document.createElement('tbody');
    let tabela = document.getElementById('tabelaPrinc');
    
    tBodyNew.setAttribute('id', 'tableBody');
    tabela.appendChild(tBodyNew);
}