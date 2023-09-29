const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const ejs = require('ejs');

require('dotenv').config({ path: './secret.env' });

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')
app.use('/assets', express.static('assets'))
app.use('/images', express.static('images'))
app.use('/views', express.static('views'))

//Conexão com o banco de dados SQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'firecool',
});
//Verifica conexão
connection.connect(function (err) {
    if (!err) {
        console.log("Conexão como o Banco realizada com sucesso!!!");
    } else {
        console.log("Erro: Conexão NÃO realizada", err);
    }
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

//Login
app.post('/login', (req, res) => {
    let username = req.body.nomelogin;
    let password = req.body.senhalogin;
    connection.query("SELECT * FROM usuario where nome_usuario = '" + username + "'", function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].senha_usuario === password) {
                    req.session.user = {
                        username: rows[0].nome_usuario,
                    };
                    res.redirect('/logadoMEC');
                } else {
                    res.send('Login Falhou - Senha incorreta');
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

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/indexMEC.html')
})

app.get('/logadoMEC', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/'); // Redirecione para a página de login se o usuário não estiver autenticado
    }
    res.render('logadoMEC', { user: req.session.user });
  });

//Porta ao qual o servidor vai rodar
app.listen(3010, () => {
    console.log('Servidor rodando na porta 3010!')
})