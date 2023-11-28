// Função para exibir a imagem selecionada pelo usuário
function exibirImagem(event) {
  // Obtém o elemento de entrada de arquivo que acionou o evento
  var inputFile = event.target;
  // Obtém as referências aos elementos do DOM necessários
  var imagemContainer = document.getElementById('imagemContainer');
  var uploadContainer = document.getElementById('uploadContainer');
  // Obtém o arquivo selecionado pelo usuário
  var file = inputFile.files[0];

  // Verifica se um arquivo foi selecionado
  if (file) {
      // Cria um objeto FileReader para ler o conteúdo do arquivo
      var reader = new FileReader();

      // Configura a função a ser executada quando o conteúdo do arquivo for lido
      reader.onload = function () {
          // Cria um elemento de imagem e configura seus atributos
          var imagem = new Image();
          imagem.src = reader.result;
          imagem.className = 'img-fluid';

          // Limpa o conteúdo anterior e adiciona a nova imagem ao contêiner de imagem
          imagemContainer.innerHTML = '';
          imagemContainer.appendChild(imagem);

          // Esconde o contêiner de upload
          uploadContainer.style.display = 'none';
      };

      // Inicia a leitura do conteúdo do arquivo como um URL de dados
      reader.readAsDataURL(file);
  }
}

// Adiciona um ouvinte de eventos para o evento 'change' do elemento de entrada de arquivo
document.getElementById('inputFile').addEventListener('change', exibirImagem);
