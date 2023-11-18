function verificarIdade() {
    var idade = parseInt(document.getElementById('idade').value);

    if (idade <= 5) {
        document.getElementById('maior5').style.display = 'none';
        document.getElementById('menor5').style.display = 'block';
    } else {
        document.getElementById('maior5').style.display = 'block';
        document.getElementById('menor5').style.display = 'none';
    }
}

// Adicionar um ouvinte de evento para o input de idade
document.getElementById('idade').addEventListener('blur', verificarIdade);