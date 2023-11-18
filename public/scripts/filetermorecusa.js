function exibirImagem(event) {
    var inputFile = event.target;
    var imagemContainer = document.getElementById('imagemContainer');
    var uploadContainer = document.getElementById('uploadContainer');
    var file = inputFile.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function () {
        var imagem = new Image();
        imagem.src = reader.result;
        imagem.className = 'img-fluid';
        imagemContainer.innerHTML = '';
        imagemContainer.appendChild(imagem);
        uploadContainer.style.display = 'none'; // Esconde o container de upload
      }
      reader.readAsDataURL(file);
    }
  }
  document.getElementById('inputFile').addEventListener('change', exibirImagem);