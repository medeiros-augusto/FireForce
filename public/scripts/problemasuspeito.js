// -----------------------------------TRANSPORTE----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxTransporte = document.getElementById('flexCheckTransporte');
    const conteudoTransporte = document.querySelector('.transporte');

    checkboxTransporte.addEventListener('change', function () {
        conteudoTransporte.style.display = this.checked ? 'block' : 'none';
    });
});
// -----------------------------------OBSTETRICO----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxObstetrico = document.getElementById('flexCheckObstetrico');
    const conteudoObstetrico = document.querySelector('.obstetrico');

    checkboxObstetrico.addEventListener('change', function () {
        conteudoObstetrico.style.display = this.checked ? 'block' : 'none';
    });
});
// -----------------------------------DIABETES----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxDiabetes = document.getElementById('flexCheckDiabetes');
    const conteudodiabetes = document.querySelector('.diabetes');

    checkboxDiabetes.addEventListener('change', function () {
        conteudodiabetes.style.display = this.checked ? 'block' : 'none';
    });
});
// -----------------------------------RESPIRATORIO----------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const checkboxRespiratorio = document.getElementById('flexCheckRespiratorio');
    const conteudoRespiratorio = document.querySelector('.respiratorio');

    checkboxRespiratorio.addEventListener('change', function () {
        conteudoRespiratorio.style.display = this.checked ? 'block' : 'none';
    });
});
// -----------------------------------ADC INPUT----------------------------------
function adicionarConjunto() {
    var divPai = document.getElementById('divPai');
    var novoInput = document.createElement('div');
    novoInput.classList.add('input-group', 'mt-3', 'conjunto');

    novoInput.innerHTML = `
        <span class="input-group-text" id="basic-addon2">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style="padding: 5%;">
        </span>
        <input type="text" class="form-control" style="text-align: center;" placeholder="Outro Problema" aria-describedby="basic-addon2">
    `;

    divPai.appendChild(novoInput);
}