// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
  // Obtém referências aos elementos relevantes no DOM
  const checkboxCPF = document.getElementById('CPF');
  const conteudoCPF = document.querySelector('.cpf');
  const checkboxRG = document.getElementById('RG');
  const conteudoRG = document.querySelector('.rg');

  // Adiciona um ouvinte de eventos para o checkbox CPF
  checkboxCPF.addEventListener('change', function () {
      // Verifica se o checkbox CPF está marcado
      if (this.checked) {
          // Exibe o conteúdo relacionado ao CPF e oculta o conteúdo relacionado ao RG
          conteudoCPF.style.display = 'block';
          conteudoRG.style.display = 'none';
          // Desmarca o checkbox RG, se estiver marcado
          checkboxRG.checked = false;
      } else {
          // Oculta o conteúdo relacionado ao CPF se o checkbox estiver desmarcado
          conteudoCPF.style.display = 'none';
      }
  });

  // Adiciona um ouvinte de eventos para o checkbox RG
  checkboxRG.addEventListener('change', function () {
      // Verifica se o checkbox RG está marcado
      if (this.checked) {
          // Exibe o conteúdo relacionado ao RG e oculta o conteúdo relacionado ao CPF
          conteudoRG.style.display = 'block';
          conteudoCPF.style.display = 'none';
          // Desmarca o checkbox CPF, se estiver marcado
          checkboxCPF.checked = false;
      } else {
          // Oculta o conteúdo relacionado ao RG se o checkbox estiver desmarcado
          conteudoRG.style.display = 'none';
      }
  });
});
