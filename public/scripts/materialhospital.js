// Função para adicionar conjuntos hospitalares dinamicamente
function addConjuntoHospital() {
    // Obtém a referência ao contêiner onde os conjuntos hospitalares serão adicionados
    var container = document.getElementById('ConjuntoHospital');
    
    // Cria um novo conjunto hospitalar como um elemento div
    var novoConjunto = document.createElement('div');
    novoConjunto.classList.add('row', 'mb-2');
    novoConjunto.innerHTML = `
        <div class="col-md-6">
            <div class="input-group mt-3">
                <span class="input-group-text">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                </span>
                <input type="text" class="form-control" placeholder="Outro Material" style="text-align: center;">
            </div>
        </div>
        <div class="col-md-6">
            <div class="input-group mt-3">
                <input type="text" class="form-control" placeholder="Quantidade" style="text-align: center;">
            </div>
        </div>
    `;
    
    // Adiciona o novo conjunto hospitalar ao contêiner
    container.appendChild(novoConjunto);
}
