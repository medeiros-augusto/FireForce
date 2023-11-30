var marcasTrauma = [];

    function mostrarImagemSelecionada() {
        // Atualiza a imagem com base nas marcações existentes
        atualizarImagem();
    }

    function marcarTrauma(event) {
        var select = document.querySelector('[name="TipoTrauma"]');
        var imagemContainer = document.getElementById("imagemContainer");

        // Obtém as coordenadas do clique em relação à div da imagem
        var rect = imagemContainer.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        // Verifica se o clique ocorreu dentro da área da div da imagem
        if (mouseX >= 0 && mouseX <= imagemContainer.clientWidth && mouseY >= 0 && mouseY <= imagemContainer.clientHeight) {
            // Cria uma nova marcação com base na opção selecionada
            var marcaTrauma = document.createElement("div");
            marcaTrauma.className = "marcaTrauma";

            // Adiciona a imagem correspondente à opção selecionada
            var selectedOption = select.options[select.selectedIndex].value;
            marcaTrauma.innerHTML = '<img src="../public/images/' + selectedOption + '.png" class="img-fluid">';

            // Posiciona a marcação no local do clique
            marcaTrauma.style.left = mouseX + "px";
            marcaTrauma.style.top = mouseY + "px";

            // Adiciona a marcação à lista de marcações
            marcasTrauma.push(marcaTrauma);

            // Adiciona a marcação ao container
            imagemContainer.appendChild(marcaTrauma);

            // Atualiza a imagem com base nas marcações existentes
            atualizarImagem();
        }
    }

    function desfazerMarcacao() {
        var imagemContainer = document.getElementById("imagemContainer");

        // Remove a última marcação, se houver
        var ultimaMarca = marcasTrauma.pop();
        if (ultimaMarca) {
            imagemContainer.removeChild(ultimaMarca);
        }

        // Atualiza a imagem com base nas marcações existentes
        atualizarImagem();
    }

    function atualizarImagem() {
        var imagemContainer = document.getElementById("imagemContainer");
        var imagemSelecionada = document.getElementById("imagemSelecionada");

        // Cria um clone da imagem original
        var imagemClone = imagemSelecionada.cloneNode(true);

        // Adiciona cada marcação ao clone
        marcasTrauma.forEach(function (marca) {
            imagemClone.appendChild(marca.cloneNode(true));
        });

        // Remove qualquer marcação existente na imagem original
        imagemSelecionada.innerHTML = "";

        // Adiciona o clone com as marcações à imagem original
        imagemSelecionada.appendChild(imagemClone);
    }