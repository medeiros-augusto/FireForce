document.addEventListener('DOMContentLoaded', function () {
    const checkboxCPF = document.getElementById('CPF');
    const conteudoCPF = document.querySelector('.cpf');
    const checkboxRG = document.getElementById('RG');
    const conteudoRG = document.querySelector('.rg');

    checkboxCPF.addEventListener('change', function () {
      if (this.checked) {
        conteudoCPF.style.display = 'block';
        conteudoRG.style.display = 'none';
        checkboxRG.checked = false;
      } else {
        conteudoCPF.style.display = 'none';
      }
    });

    checkboxRG.addEventListener('change', function () {
      if (this.checked) {
        conteudoRG.style.display = 'block';
        conteudoCPF.style.display = 'none';
        checkboxCPF.checked = false;
      } else {
        conteudoRG.style.display = 'none';
      }
    });
  });