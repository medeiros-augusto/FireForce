
function buscarEExibirResultado() {
    // Obtém o valor do campo "Nº Ocorrência"
    var numeroOcorrencia = document.getElementById('inputNumeroOcorrencia').value;

    // Verifica se o valor não está vazio
    if (numeroOcorrencia.trim() !== '') {
        // Tenta encontrar o elemento com o ID correspondente
        var elementoAlvo = document.getElementById(numeroOcorrencia);

        if (elementoAlvo) {
            // Se encontrado, rola para o elemento
            elementoAlvo.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Se não encontrado, exibe um pop-up
            alert('Ocorrência não encontrada');
        }
    }
}

