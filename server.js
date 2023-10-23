const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const port = 3010;
var path = require('path')
const app = express()

app.use(session({secret:'fodase'}))
app.use(bodyParser.urlencoded({extended:true}))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'fireforce',
});


connection.connect(function (err) {
    if (!err) {
        console.log("Conexão como o Banco realizada com sucesso!!!")
    } else {
        console.log("Erro: Conexão NÃO realizada", err)
    }
});

//--------Login--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

//--------Dado Paciente--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dados_paciente.html')
})

//--------Dado Ocorrência--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dados_ocorrencia.html')
})

//--------Tipo Ocorrência--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/tipo_ocorrencia.html')
}) 

//--------Problemas Encontrados Suspeito--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/problemas_suspeitos.html')
})

//--------Sinais Sintomas--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sinais_sintomas.html')
})

//--------Avaliação Paciente--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/avaliacao_paciente.html')
})

//--------Avaliação Paciente MAIOR 5--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/avaliacao_pacienteMaior5.html')
})

//--------Avaliação Paciente MENOR 5--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/avaliacao_pacienteMenor5.html')
})

//--------Localização Traumas--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/localizacao_traumas.html')
})

//--------Forma Condução/Vítima Era/Objetos Recolhidos--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/forma_conducao.html')
})

//--------Sinais Vitais--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sinais_vitais.html')
})

//--------Decisão Transporte--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/decisao_transporte.html')
})

//--------Procedimentos Efetuados--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/procedimentos_efetuados.html')
})

//--------Anamnese Emergência Médica--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/anamnese_emergencia_medica.html')
})

//--------Anamnese Gestacional--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/anamnese_gestacional.html')
})

//--------Avaliação Cinemática--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/avaliacao_cinematica.html')
})

//--------Materiais Utlizados Descartáveis--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/materiais_utilizados_descartaveis.html')
})

//--------Materiais Utlizados Deixados No Hospital--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/materiais_utilizados_hospital.html')
})

//--------Termo de Recusa/Observações Importantes--------

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/termo_recusa.html')
})


app.post('/', (req,res)=>{
    global.nomelogin = req.body.nomelogin
    let senha = req.body.senhalogin

    connection.query("SELECT * FROM usuario where nome_usuario = '" + global.login + "'", function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].senha_usuario === senha) {
                    req.session.nomelogin = global.nomelogin
                    res.render('home', {login: global.nomelogin})
                } else {
                    res.render('login')
                }
            } else {
                res.send('Login Falhou - Usuário não cadastrado')
            }
        } else {
            console.log("Erro: Consulta não realizada", err)
            res.send('Login failed')
        }
    })
})

app.get('/', (req,res)=>{
    if (req.session.nomelogin){
        res.render('home', {login: global.nomelogin})
    }else{
        res.render('login')
    }
})

app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}`)
})