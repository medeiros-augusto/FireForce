//--------------- MENOR DE 5 ANOS ---------------


function calcularPontuacao() {
    var pontuacao = 0;

    var aberturaOcular = document.getElementsByName('avalia4');
    aberturaOcular.forEach(function(input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    var respostaVerbal = document.getElementsByName('avalia5');
    respostaVerbal.forEach(function(input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    var respostaMotora = document.getElementsByName('avalia6');
    respostaMotora.forEach(function(input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    document.getElementById('pontuacaoTotal').value = pontuacao;
}

var inputs = document.querySelectorAll('input[type=radio]');
inputs.forEach(function(input) {
    input.addEventListener('change', calcularPontuacao);
});

