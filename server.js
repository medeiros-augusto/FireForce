const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')
app.use('/assets', express.static('assets'))
app.use('/images', express.static('images'))
app.use('/pages', express.static('pages'))

//Conexão com o banco de dados SQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'firecool',
});
//Verifica conexão
connection.connect(function(err) {
    if (!err) {
        console.log("Conexão como o Banco realizada com sucesso!!!");
    } else {
        console.log("Erro: Conexão NÃO realizada", err);
    }
});

//get para pagina inicial
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

//Porta ao qual o servidor vai rodar
app.listen(3010, () => {
    console.log('Servidor rodando na porta 3010!')
})

//Login
app.post('/login', (req, res) => {
    let username = req.body.nomelogin;
    let password = req.body.senhalogin;

    connection.query("SELECT * FROM usuario where nome_usuario = '" + username + "'", function (err, rows, fields) {
        console.log("Results:", rows);
        if (!err) {
            if (rows.length > 0) {

                if (rows[0].senha_usuario === password) {
                    res.send("VAI SE FODER")
                } else {
                    res.send('Senha incorreta');
                }

            } else {
                res.send('Login Falhou - Usuário não cadastrado');
            }
        } else {
            console.log("Erro: Consulta não realizada", err);
            res.send('Login failed');
        }
    });
});