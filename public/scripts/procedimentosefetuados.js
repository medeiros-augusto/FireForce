// -----------------------------------POLICIA----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxPolicia = document.getElementById('flexCheckPolicia');
    const conteudoPolicia = document.querySelector('.policia');

    checkboxPolicia.addEventListener('change', function () {
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
    const checkboxSamu = document.getElementById('flexCheckColar');
    const conteudoSamu = document.querySelector('.TAM');

    checkboxSamu.addEventListener('change', function () {
        conteudoSamu.style.display = this.checked ? 'block' : 'none';
    });
});

// -----------------------------------ADC INPUT----------------------------------
function addConjunto() {
    var divPai = document.getElementById('divPadrasto');
    var novoInput = document.createElement('div');
    novoInput.classList.add('input-group', 'mt-3', 'conjunto');

    novoInput.innerHTML = `
        <span class="input-group-text" id="basic-addon2">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="padding: 5%;">
        </span>
        <input type="text" class="form-control" style="text-align: center;" placeholder="Outro" aria-describedby="basic-addon2">
    `;

    divPai.appendChild(novoInput);
}