function storeTraumaIcon(x, y, traumaType) {
    let traumaIcons = JSON.parse(localStorage.getItem('traumaIcons')) || [];
    traumaIcons.push({ x, y, traumaType });
    localStorage.setItem('traumaIcons', JSON.stringify(traumaIcons));
}

function removeLastTraumaIcon() {
    let traumaIcons = JSON.parse(localStorage.getItem('traumaIcons')) || [];
    if (traumaIcons.length > 0) {
        traumaIcons.pop();
        localStorage.setItem('traumaIcons', JSON.stringify(traumaIcons));

        let imageContainer = document.getElementById('imageContainer');
        let lastIcon = imageContainer.lastElementChild;
        if (lastIcon.tagName === 'IMG') {
            imageContainer.removeChild(lastIcon);
        }
    }
}

function recreateTraumaImage() {
    let traumaIcons = JSON.parse(localStorage.getItem('traumaIcons')) || {};
    traumaIcons.forEach(icon => {
        createTraumaIcon(icon.x, icon.y, icon.traumaType);
    });
}

function createTraumaIcon(x, y, traumaType) {
    let icon = document.createElement('img');
    icon.src = `/trauma_icon/${traumaType}.png`;
    icon.style.position = 'absolute';
    let iconWidth = 50;
    let iconHeight = 50;
    icon.style.left = `${x - iconWidth / 2}px`;
    icon.style.top = `${y - iconHeight / 2}px`;
    icon.style.width = `${iconWidth}px`;
    icon.style.height = `${iconHeight}px`;
    icon.style.padding = '0';
    document.getElementById('imageContainer').appendChild(icon);
}

document.addEventListener('DOMContentLoaded', recreateTraumaImage);

document.getElementById('undoBtn').addEventListener('click', function () {
    removeLastTraumaIcon();
});

document.getElementById('nextBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    let canvas = await html2canvas(document.getElementById('imageContainer'));
    let imgData = canvas.toDataURL('image/png');

    let formData = JSON.parse(localStorage.getItem('formData')) || {};

    formData['traumaImage'] = imgData;

    localStorage.setItem('formData', JSON.stringify(formData));

    console.log('Stored Data:', formData);  

    window.location.href = 'traumaDesc.html';
});

let img = document.getElementById('corpo');
img.addEventListener('click', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let traumaType = document.getElementById('traumaType').value;

    storeTraumaIcon(x, y, traumaType);
    createTraumaIcon(x, y, traumaType);
});

// --------------------FUNÇÃO APARECER SIMBOLO-------------------

function mostrarImagem() {
    var select = document.getElementById("traumaType");
    var imagemContainer = document.getElementById("imagemContainer");
    var imagemMostrada = document.getElementById("imagemMostrada");

    // Mapeia opções para caminhos de imagem correspondentes
    var imagens = {
      "Fratura_Luxacao_Entorse": "../public/images/Fratura_Luxacao_Entorse.png",
      "Ferimentos_diversos": "../public/images/Ferimentos_diversos.png",
      "Hemorragia": "../public/images/Hemorragia.png",
      "Evisceracao": "../public/images/Evisceracao.png",
      "FAB_FAF": "../public/images/FAB_FAF.png",
      "Amputacao": "../public/images/Amputacao.png",
      "Queimadura_1": "../public/images/Queimadura_1.png",
      "Queimadura_2": "../public/images/Queimadura_2.png",
      "Queimadura_3": "../public/images/Queimadura_3.png"
    };

    // Obtém o valor da opção selecionada
    var selectedOption = select.options[select.selectedIndex].value;

    // Atualiza a src da imagem com base na opção selecionada
    imagemMostrada.src = imagens[selectedOption];

    // Exibe o contêiner da imagem
    imagemContainer.style.display = "block";
  }