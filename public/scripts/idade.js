// Função para verificar a idade e exibir elementos com base na condição
function verificarIdade() {
    // Obtém o valor do campo "idade" e converte para um número inteiro
    var idade = parseInt(document.getElementById('idade').value);

    // Verifica a condição da idade
    if (idade <= 5) {
        // Se a idade for menor ou igual a 5, exibe o elemento com ID 'menor5' e oculta 'maior5'
        document.getElementById('maior5').style.display = 'none';
        document.getElementById('menor5').style.display = 'block';
    } else {
        // Se a idade for maior que 5, exibe o elemento com ID 'maior5' e oculta 'menor5'
        document.getElementById('maior5').style.display = 'block';
        document.getElementById('menor5').style.display = 'none';
    }
}

// Adiciona um ouvinte de eventos para o evento 'blur' no input de idade
document.getElementById('idade').addEventListener('blur', verificarIdade);
