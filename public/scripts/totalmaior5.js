//--------------- MAIOR DE 5 ANOS ---------------

// Função para calcular a pontuação com base nas respostas selecionadas
function calcularPontuacao() {
    var pontuacao = 0;

    // Obtém as respostas para a abertura ocular
    var aberturaOcular = document.getElementsByName('AberturaOcularMaior');
    aberturaOcular.forEach(function (input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    // Obtém as respostas para a resposta verbal
    var respostaVerbal = document.getElementsByName('RespostaVerbalMaior');
    respostaVerbal.forEach(function (input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    // Obtém as respostas para a resposta motora
    var respostaMotora = document.getElementsByName('RespostaMotoraMaior');
    respostaMotora.forEach(function (input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    // Atualiza os campos de total de pontuação
    document.getElementById('totalPontuacao').value = pontuacao;
    document.getElementById('totalmaior').value = pontuacao;
}

// Adiciona um ouvinte de evento de mudança para os inputs do tipo radio
var inputs = document.querySelectorAll('input[type=radio]');
inputs.forEach(function (input) {
    input.addEventListener('change', calcularPontuacao);
});
