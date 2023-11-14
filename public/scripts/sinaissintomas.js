        // -----------------------------------Cianose----------------------------------
        document.addEventListener('DOMContentLoaded', function () {
            const checkboxTransporte = document.getElementById('flexCheckCianose');
            const conteudoTransporte = document.querySelector('.cianose');

            checkboxTransporte.addEventListener('change', function () {
                conteudoTransporte.style.display = this.checked ? 'block' : 'none';
            });
        });
        // -----------------------------------Edema----------------------------------
        document.addEventListener('DOMContentLoaded', function () {
            const checkboxTransporte = document.getElementById('flexCheckEdema');
            const conteudoTransporte = document.querySelector('.edema');

            checkboxTransporte.addEventListener('change', function () {
                conteudoTransporte.style.display = this.checked ? 'block' : 'none';
            });
        });
        // -----------------------------------Pupila----------------------------------
        document.addEventListener('DOMContentLoaded', function () {
            const checkboxTransporte = document.getElementById('flexCheckPupila');
            const conteudoTransporte = document.querySelector('.pupila');

            checkboxTransporte.addEventListener('change', function () {
                conteudoTransporte.style.display = this.checked ? 'block' : 'none';
            });
        });
        // -----------------------------------Hemorragia----------------------------------
        document.addEventListener('DOMContentLoaded', function () {
            const checkboxTransporte = document.getElementById('flexCheckHemo');
            const conteudoTransporte = document.querySelector('.hemorragia');

            checkboxTransporte.addEventListener('change', function () {
                conteudoTransporte.style.display = this.checked ? 'block' : 'none';
            });
        });
        // -----------------------------------Parada----------------------------------
        document.addEventListener('DOMContentLoaded', function () {
            const checkboxTransporte = document.getElementById('flexCheckParada');
            const conteudoTransporte = document.querySelector('.parada');

            checkboxTransporte.addEventListener('change', function () {
                conteudoTransporte.style.display = this.checked ? 'block' : 'none';
            });
        });

        // -----------------------------------ADC INPUT----------------------------------
        function adicionarConjuntos() {
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