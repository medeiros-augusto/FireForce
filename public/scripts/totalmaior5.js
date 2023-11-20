    //--------------- MAIOR DE 5 ANOS ---------------
    
    function calcularPontuacao() {
    var pontuacao = 0;

    var aberturaOcular = document.getElementsByName('AberturaOcularMaior');
    aberturaOcular.forEach(function (input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    var respostaVerbal = document.getElementsByName('RespostaVerbalMaior');
    respostaVerbal.forEach(function (input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    var respostaMotora = document.getElementsByName('RespostaMotoraMaior');
    respostaMotora.forEach(function (input) {
        if (input.checked) {
            pontuacao += parseInt(input.parentElement.nextElementSibling.value);
        }
    });

    document.getElementById('totalPontuacao').value = pontuacao;
    document.getElementById('totalmaior').value = pontuacao;
}

var inputs = document.querySelectorAll('input[type=radio]');
inputs.forEach(function (input) {
    input.addEventListener('change', calcularPontuacao);
});

