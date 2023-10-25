fetch('/getUsers')
    .then(response => response.json())
    .then(users => {
        const userDataDiv = document.getElementById('user-data');
        const userList = users.map(user => {
            return `<p>ID: ${user.id_usuario}, Nome: ${user.nome_usuario}, Senha: ${user.senha_usuario}</p>`;
        });
        userDataDiv.innerHTML = userList.join('');
    })
    .catch(error => {
        console.error('Erro ao buscar dados do servidor', error);
    });