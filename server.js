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
    password: 'root',
    database: 'noar',
});


connection.connect(function (err) {
    if (!err) {
        console.log("Conexão como o Banco realizada com sucesso!!!")
    } else {
        console.log("Erro: Conexão NÃO realizada", err)
    }
});

//--------Dado Paciente--------

app.get('/dados_paciente', (req, res) => {
    if (req.session.nomelogin){
        res.render('dados_paciente')
    }else{
        res.render('login')
    }
})

//--------Dado Ocorrência--------

app.get('/dados_ocorrencia', (req, res) => {
    if (req.session.nomelogin){
        res.render('dados_ocorrencia')
    }else{
        res.render('login')
    }
})

//--------Tipo Ocorrência--------

app.get('/tipo_ocorrencia', (req, res) => {
    if (req.session.nomelogin){
        res.render('tipo_ocorrencia')
    }else{
        res.render('login')
    }
})

//--------Problemas Encontrados Suspeito--------

app.get('/probelmas_suspeitos', (req, res) => {
    if (req.session.nomelogin){
        res.render('probelmas_suspeitos')
    }else{
        res.render('login')
    }
})

//--------Sinais Sintomas--------

app.get('/sinais_sintomas', (req, res) => {
    if (req.session.nomelogin){
        res.render('sinais_sintomas')
    }else{
        res.render('login')
    }
})

//--------Avaliação Paciente--------

app.get('/avaliacao_paciente', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_paciente')
    }else{
        res.render('login')
    }
})

//--------Avaliação Paciente MAIOR 5--------

app.get('/avaliacao_pacienteMaior5', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_pacienteMaior5')
    }else{
        res.render('login')
    }
})

//--------Avaliação Paciente MENOR 5--------

app.get('/avaliacao_pacienteMenor5', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_pacienteMenor5')
    }else{
        res.render('login')
    }
})

//--------Localização Traumas--------

app.get('/localizacao_traumas', (req, res) => {
    if (req.session.nomelogin){
        res.render('localizacao_traumas')
    }else{
        res.render('login')
    }
})

//--------Forma Condução/Vítima Era/Objetos Recolhidos--------

app.get('/forma_conducao', (req, res) => {
    if (req.session.nomelogin){
        res.render('forma_conducao')
    }else{
        res.render('login')
    }
})

//--------Sinais Vitais--------

app.get('/sinais_vistos', (req, res) => {
    if (req.session.nomelogin){
        res.render('sinais_vistos')
    }else{
        res.render('login')
    }
})

//--------Decisão Transporte--------

app.get('/decisao_transporte', (req, res) => {
    if (req.session.nomelogin){
        res.render('sinais_vistos')
    }else{
        res.render('login')
    }
})

//--------Procedimentos Efetuados--------

app.get('/procedimentos_efetuados', (req, res) => {
    if (req.session.nomelogin){
        res.render('procedimentos_efetuados')
    }else{
        res.render('login')
    }
})


//--------Anamnese Emergência Médica--------

app.get('/anamnese_emergencia_medica', (req, res) => {
    if (req.session.nomelogin){
        res.render('anamnese_emergencia_medica')
    }else{
        res.render('login')
    }
})
//--------Anamnese Gestacional--------

app.get('/anamnese_gestacional', (req, res) => {
    if (req.session.nomelogin){
        res.render('anamnese_gestacional')
    }else{
        res.render('login')
    }
})
//--------Avaliação Cinemática--------

app.get('/avaliacao_cinematica', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_cinematica')
    }else{
        res.render('login')
    }
})

//--------Materiais Utlizados Descartáveis--------

app.get('/materiais_utilizados_descartaveis', (req, res) => {
    if (req.session.nomelogin){
        res.render('materiais_utilizados_descartaveis')
    }else{
        res.render('login')
    }
})

//--------Materiais Utlizados Deixados No Hospital--------

app.get('/materiais_utilizados_hospital', (req, res) => {
    if (req.session.nomelogin){
        res.render('materiais_utilizados_hospital')
    }else{
        res.render('login')
    }
})

// //--------Termo de Recusa/Observações Importantes--------

app.get('/termo_recusa', (req, res) => {
    if (req.session.nomelogin){
        res.render('/termo_recusa')
    }else{
        res.render('login')
    }
})


app.post('/', (req,res)=>{
    global.nomelogin = req.body.nomelogin
    let senha = req.body.senhalogin

    connection.query("SELECT * FROM usuario where nome_usuario = '" + global.nomelogin + "'", function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].senha_usuario === senha) {
                    req.session.nomelogin = global.nomelogin
                    res.render('criar_ocorrencia_historico', {login: global.nomelogin})
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
        res.render('criar_ocorrencia_historico', {login: global.nomelogin})
    }else{
        res.render('login')
    }
})

app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}`)
})