// -----------------------------------Cianose----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxCianose = document.getElementById('flexCheckCianose');
    const conteudoCianose = document.querySelector('.cianose');

    checkboxCianose.addEventListener('change', function () {
        conteudoCianose.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------Edema----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxEdema = document.getElementById('flexCheckEdema');
    const conteudoEdema = document.querySelector('.edema');

    checkboxEdema.addEventListener('change', function () {
        conteudoEdema.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------Pupila----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxPupila = document.getElementById('flexCheckPupila');
    const conteudoPupila = document.querySelector('.pupila');

    checkboxPupila.addEventListener('change', function () {
        conteudoPupila.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------Hemorragia----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxHemorragia = document.getElementById('flexCheckHemo');
    const conteudoHemorragia = document.querySelector('.hemorragia');

    checkboxHemorragia.addEventListener('change', function () {
        conteudoHemorragia.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------Parada----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxParada = document.getElementById('flexCheckParada');
    const conteudoParada = document.querySelector('.parada');

    checkboxParada.addEventListener('change', function () {
        conteudoParada.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------ADC INPUT----------------------------------
// Função para adicionar conjuntos dinamicamente
function adicionarConjuntos() {
    // Obtém a referência ao contêiner onde os conjuntos serão adicionados
    var divPai = document.getElementById('divMae');
    
    // Cria um novo conjunto como um elemento div
    var novoInput = document.createElement('div');
    novoInput.classList.add('input-group', 'mt-3', 'conjunto');

    // Define o HTML do novo conjunto
    novoInput.innerHTML = `
        <span class="input-group-text" id="basic-addon2">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="padding: 5%;">
        </span>
        <input type="text" class="form-control" style="text-align: center;" placeholder="Outro Problema" aria-describedby="basic-addon2">
    `;

    // Adiciona o novo conjunto ao contêiner
    divPai.appendChild(novoInput);
}
