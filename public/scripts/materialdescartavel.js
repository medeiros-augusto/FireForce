function addConjuntos() {
    var container = document.getElementById('divDescartavel');
    var novoConjunto = document.createElement('div');
    novoConjunto.classList.add('row', 'mb-2');
    novoConjunto.innerHTML = `
          <div class="col-md-6">
              <div class="input-group mt-3">
                  <span class="input-group-text">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                  </span>
                  <input type="text" class="form-control" placeholder="Outro" style="text-align: center;">
              </div>
          </div>
          <div class="col-md-6">
              <div class="input-group mt-3">
                  <input type="text" class="form-control" placeholder="Quantidade" style="text-align: center;">
              </div>
          </div>
      `;
    container.appendChild(novoConjunto);
  }