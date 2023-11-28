// -----------------------------------POLICIA----------------------------------
// Adiciona um ouvinte de eventos para o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Obtém a referência ao checkbox da polícia e ao conteúdo relacionado
    const checkboxPolicia = document.getElementById('flexCheckPolicia');
    const conteudoPolicia = document.querySelector('.policia');

    // Adiciona um ouvinte de eventos para o evento 'change' no checkbox da polícia
    checkboxPolicia.addEventListener('change', function () {
        // Define a exibição do conteúdo da polícia com base no estado do checkbox
        conteudoPolicia.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------SAMU----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxSamu = document.getElementById('flexCheckSamu');
    const conteudoSamu = document.querySelector('.samu');

    checkboxSamu.addEventListener('change', function () {
        conteudoSamu.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------TAM----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxColar = document.getElementById('flexCheckColar');
    const conteudoTAM = document.querySelector('.TAM');

    checkboxColar.addEventListener('change', function () {
        conteudoTAM.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------ADC INPUT----------------------------------
// Função para adicionar conjuntos dinamicamente
function addConjunto() {
    // Obtém a referência ao contêiner onde os conjuntos serão adicionados
    var divPai = document.getElementById('divPadrasto');
    
    // Cria um novo conjunto como um elemento div
    var novoInput = document.createElement('div');
    novoInput.classList.add('input-group', 'mt-3', 'conjunto');

    // Define o HTML do novo conjunto
    novoInput.innerHTML = `
        <span class="input-group-text" id="basic-addon2">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="padding: 5%;">
        </span>
        <input type="text" class="form-control" style="text-align: center;" placeholder="Outro" aria-describedby="basic-addon2">
    `;

    // Adiciona o novo conjunto ao contêiner
    divPai.appendChild(novoInput);
}
