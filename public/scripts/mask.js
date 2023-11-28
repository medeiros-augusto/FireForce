// Máscara para o input de celular
$(document).ready(function () {
  $('#number').mask('(00) 0000-0000');
});

// Máscara para o input de data
$(document).ready(function () {
  $('#date').mask('00/00/0000');
});

// Máscara para o input de CPF
$(document).ready(function () {
  $('#cpf').mask('000.000.000-00');
});

// Máscara para o input de RG
$(document).ready(function () {
  $('#rg').mask('0.000.000');
});

// Máscara para o input de idade do paciente
$(document).ready(function () {
  $('#idade').mask('00', { reverse: true });
});

// Máscara para o input de idade do acompanhante
$(document).ready(function () {
  $('#acompidade').mask('00', { reverse: true });
});

// Permite apenas caracteres válidos no input de nome do paciente
$(document).ready(function () {
  $('#nomep').on('input', function () {
    $(this).val($(this).val().replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, ''));
  });
});

// Permite apenas caracteres válidos no input de nome do acompanhante
$(document).ready(function () {
  $('#nomea').on('input', function () {
    $(this).val($(this).val().replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, ''));
  });
});
