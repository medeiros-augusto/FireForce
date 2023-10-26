fetch('/getUsers')
    .then(response => response.json())
    .then(users => {
        const userDataDiv = document.getElementById('user-data');
        const userList = users.map(user => {
            return `
            <div class="col-sm-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${user.nome_usuario}</h5>
                <p class="card-text">
                Id: ${user.id_usuario} </br>
                Senha: ${user.senha_usuario}
                </p>
                <a href="#" class="btn btn-primary">Modificar</a>
              </div>
            </div>
          </div>
            `;
        });
        userDataDiv.innerHTML = userList.join('');
    })
    .catch(error => {
        console.error('Erro ao buscar dados do servidor', error);
    });