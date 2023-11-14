const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const port = 3010;
var path = require('path')
const app = express()

app.use(session({secret:'gsdgsdfqfq2f3fd'}))
app.use(bodyParser.urlencoded({extended:true}))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
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
        res.redirect('/')
    }
})

//--------Dado Ocorrência--------

app.get('/dados_ocorrencia', (req, res) => {
    if (req.session.nomelogin){
        res.render('dados_ocorrencia')
    }else{
        res.redirect('/')
    }
})

//--------Tipo Ocorrência--------

app.get('/tipo_ocorrencia', (req, res) => {
    if (req.session.nomelogin){
        res.render('tipo_ocorrencia')
    }else{
        res.redirect('/')
    }
})

//--------Problemas Encontrados Suspeito--------

app.get('/problemas_suspeitos', (req, res) => {
    if (req.session.nomelogin){
        res.render('problemas_suspeitos')
    }else{
        res.redirect('/')
    }
})

//--------Sinais Sintomas--------

app.get('/sinais_sintomas', (req, res) => {
    if (req.session.nomelogin){
        res.render('sinais_sintomas')
    }else{
        res.redirect('/')
    }
})

//--------Avaliação Paciente--------

app.get('/avaliacao_paciente', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_paciente')
    }else{
        res.redirect('/')
    }
})

//--------Avaliação Paciente MAIOR 5--------

app.get('/avaliacao_pacienteMaior5', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_pacienteMaior5')
    }else{
        res.redirect('/')
    }
})

//--------Avaliação Paciente MENOR 5--------

app.get('/avaliacao_pacienteMenor5', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_pacienteMenor5')
    }else{
        res.redirect('/')
    }
})

//--------Localização Traumas--------

app.get('/localizacao_traumas', (req, res) => {
    if (req.session.nomelogin){
        res.render('localizacao_traumas')
    }else{
        res.redirect('/')
    }
})

//--------Forma Condução/Vítima Era/Objetos Recolhidos--------

app.get('/forma_conducao', (req, res) => {
    if (req.session.nomelogin){
        res.render('forma_conducao')
    }else{
        res.redirect('/')
    }
})

//--------Sinais Vitais--------

app.get('/sinais_vitais', (req, res) => {
    if (req.session.nomelogin){
        res.render('sinais_vitais')
    }else{
        res.redirect('/')
    }
})

//--------Decisão Transporte--------

app.get('/decisao_transporte', (req, res) => {
    if (req.session.nomelogin){
        res.render('decisao_transporte')
    }else{
        res.redirect('/')
    }
})

//--------Procedimentos Efetuados--------

app.get('/procedimentos_efetuados', (req, res) => {
    if (req.session.nomelogin){
        res.render('procedimentos_efetuados')
    }else{
        res.redirect('/')
    }
})


//--------Anamnese Emergência Médica--------

app.get('/anamnese_emergencia_medica', (req, res) => {
    if (req.session.nomelogin){
        res.render('anamnese_emergencia_medica')
    }else{
        res.redirect('/')
    }
})
//--------Anamnese Gestacional--------

app.get('/anamnese_gestacional', (req, res) => {
    if (req.session.nomelogin){
        res.render('anamnese_gestacional')
    }else{
        res.redirect('/')
    }
})
//--------Avaliação Cinemática--------

app.get('/avaliacao_cinematica', (req, res) => {
    if (req.session.nomelogin){
        res.render('avaliacao_cinematica')
    }else{
        res.redirect('/')
    }
})

//--------Materiais Utlizados Descartáveis--------

app.get('/materiais_utilizados_descartaveis', (req, res) => {
    if (req.session.nomelogin){
        res.render('materiais_utilizados_descartaveis')
    }else{
        res.redirect('/')
    }
})

//--------Materiais Utlizados Deixados No Hospital--------

app.get('/materiais_utilizados_hospital', (req, res) => {
    if (req.session.nomelogin){
        res.render('materiais_utilizados_hospital')
    }else{
        res.redirect('/')
    }
})

// //--------Termo de Recusa/Observações Importantes--------

app.get('/termo_recusa', (req, res) => {
    if (req.session.nomelogin){
        res.render('termo_recusa')
    }else{
        res.redirect('/')
    }
})

app.get('/usuarios', (req, res) => {
    if (req.session.nomelogin == 'adm'){
        res.render('usuarios');
    }else (
        res.send("[ERRO] Usuário logado não é Administrador!")
    )
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Erro ao fazer logout:', err);
      }
      res.redirect('/'); // Redireciona o usuário de volta para a página de login ou outra página inicial.
    });
  });
  
  app.get('/getUsers', (req, res) => {
    connection.query('SELECT id_usuario, nome_usuario, senha_usuario FROM usuario', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
      } else {
        res.status(200).json(results);
      }
    });
  });

app.get('/', (req,res)=>{
    if(req.session.nomelogin == 'adm'){
        res.render('painel_adm')
    }else if (req.session.nomelogin){
        res.render('home', {login: global.nomelogin})
    }else{
        res.render('login')
    }
})

app.get('/criar_usuario', (req, res) =>{
    if (req.session.nomelogin === 'adm'){
        res.render('criar_usuario')
    }else{
        res.send("[ERRO] Usuário logado não é Administrador!")
    }
})

app.post('/', (req, res) =>{
    global.nomelogin = req.body.nomelogin
    let senha = req.body.senhalogin

    connection.query("SELECT * FROM usuario where nome_usuario = '" + global.nomelogin + "'", function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].senha_usuario === senha) {
                    req.session.nomelogin = global.nomelogin
                    if (req.session.nomelogin == 'adm'){
                        res.render('painel_adm', {login: global.nomelogin})
                    }else{
                        res.render('home', {login: global.nomelogin})
                    }
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

app.post('/criar_usuario', (req, res) => {
    const login = req.body.login;
    const senha = req.body.senha;
    const confirmasenha = req.body.confirmasenha;

    if (login.length > 0) {
        if (senha === confirmasenha) {
            const sql = "INSERT INTO usuario (nome_usuario, senha_usuario) VALUES (?, ?)";
            connection.query(sql, [login, senha], function (err, result) {
                if (!err) {
                    console.log("Usuário cadastrado com sucesso!");
                    res.render('painel_adm');
                } else {
                    console.log("Erro ao inserir no banco de dados:", err);
                    res.status(500).send("Erro ao cadastrar usuário");
                }
            });
        } else {
            console.log("Erro ao confirmar senha!");
            res.render('criar_usuario');
        }
    } else {
        console.log("Login não preenchido");
        res.render('criar_usuario');
    }
});

app.post('/usuarios', (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const senha = req.body.senha

    const sql = "UPDATE usuario SET nome_usuario = ? , senha_usuario = ? WHERE `usuario`.`id_usuario` = ?;"

    connection.query(sql, [nome, senha, id], (err, result) => {
        if (err) {
            console.error('Erro na atualização: ' + err.message)
            res.send('Erro na atualização no perfil do usuário.')
            console.log(id)
        } else {
            console.log('Registro atualizado com sucesso')
            console.log(id)
            res.render('usuarios')
        }
    });
})


app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}`)
})