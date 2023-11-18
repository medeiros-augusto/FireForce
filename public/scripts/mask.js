    // <!-- Input celular  -->
    
    $(document).ready(function () {
      $('#number').mask('(00) 0000-0000');
    });
    // <!-- Input Data  -->

    $(document).ready(function () {
      $('#date').mask('00/00/0000')
    });

    // <!-- Input cpf  -->

    $(document).ready(function () {
      $('#cpf').mask('000.000.000-00')
    });

    // <!-- Input rg  -->

    $(document).ready(function () {
      $('#rg').mask('0.000.000')
    });

    // <!-- Input idade paciente  -->

    $(document).ready(function () {
      $('#idade').mask('00', { reverse: true });
    });

    // <!-- Input idade acompanhante  -->

    $(document).ready(function () {
      $('#acompidade').mask('00', { reverse: true });
    });

    // <!-- Input nome paciente  -->

    $(document).ready(function () {
      $('#nomep').on('input', function () {
        $(this).val($(this).val().replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, ''));
      });
    });

    // <!-- Input nome acompanhante  -->

    $(document).ready(function () {
      $('#nomea').on('input', function () {
        $(this).val($(this).val().replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g, ''));
      });
    });