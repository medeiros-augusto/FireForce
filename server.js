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

app.get('/', (req,res)=>{
    if(req.session.nomelogin == 'adm'){
        res.render('painel_adm')
    }else if (req.session.nomelogin){
        res.render('home', {login: global.nomelogin})
    }else{
        res.render('login')
    }
})

app.get('/ocorrencia', (req, res) => {
    if (req.session.nomelogin){
        res.render('ocorrencia');
    }else (
        res.send("[ERRO] Necessário realizar login!")
    )
  });

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
      res.redirect('/'); 
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

app.post('/ocorrencia', (req, res) => {
    //Accordion Dados Paciente
    const DataDadosPaciente = req.body.DataDadosPaciente
    const SexoDadosPaciente = req.body.SexoDadosPaciente
    const NomeHospitalDadosPaciente = req.body.NomeHospitalDadosPaciente
    const NomePacienteDadosPaciente = req.body.NomePacienteDadosPaciente
    const CpfDadosPaciente = 'CPF '+req.body.CpfDadosPaciente
    const RgDadosPaciente = 'RG '+req.body.RgDadosPaciente
    const FonePacienteDadosPaciente = req.body.FonePacienteDadosPaciente
    const IdadePacienteDadosPaciente = req.body.IdadePacienteDadosPaciente
    const NomeAcompanhanteDadosPaciente = req.body.NomeAcompanhanteDadosPaciente    
    const IdadeAcompanhanteDadosPaciente = req.body.IdadeAcompanhanteDadosPaciente    
    const LocalOcorrenciaDadosPaciente = req.body.LocalOcorrenciaDadosPaciente
    //Accordion Dados Ocorrencia
    const NumeroUsbDadosOcorrencia = req.body.NumeroUsbDadosOcorrencia
    const DespDadosOcorrencia = req.body.DespDadosOcorrencia
    const HCHDadosOcorrencia = req.body.HCHDadosOcorrencia
    const KmFinalDadosOcorrencia = req.body.KmFinalDadosOcorrencia
    const CodDadosOcorrencia = req.body.CodDadosOcorrencia
    const CodSiaSusDadosOcorrencia = req.body.CodSiaSusDadosOcorrencia
    //Accordion Tipo de Ocorrencia
    const TipoOcorrencia = req.body.TipoOcorrencia ? req.body.TipoOcorrencia : '*'
    //Accordion Problemas Encontrados Suspeitos
    const PsiquiatricoProblemasSuspeitos = req.body.PsiquiatricoProblemasSuspeitos ? req.body.PsiquiatricoProblemasSuspeitos : '*'
    const RespiratorioProblemasSuspeitos = `${req.body.RespiratorioProblemasSuspeitos ? req.body.RespiratorioProblemasSuspeitos : '*'} ${req.body.DPOCProblemasSuspeitos ? req.body.DPOCProblemasSuspeitos : '*'} ${req.body.InalacaoFumacaProblemasSuspeitos ? req.body.InalacaoFumacaProblemasSuspeitos : '*'}`
    const DiabetesProblemasSuspeitos = `${req.body.DiabetesProblemasSuspeitos ? req.body.DiabetesProblemasSuspeitos : '*'} ${req.body.HiperglicemiaProblemasSuspeitos ? req.body.HiperglicemiaProblemasSuspeitos : '*'} ${req.body.HipoglicemiaProblemasSuspeitos? req.body.HipoglicemiaProblemasSuspeitos : '*'}`
    const ObstetricoProblemasSuspeitos = `${req.body.ObstetricoProblemasSuspeitos ? req.body.ObstetricoProblemasSuspeitos : '*' } ${req.body.PartoEmergencialProblemasSuspeitos ? req.body.PartoEmergencialProblemasSuspeitos : '*' } ${req.body.GestanteProblemasSuspeitos ? req.body.GestanteProblemasSuspeitos : '*'} ${req.body.HemorExcessivaProblemasSuspeitos ? req.body.HemorExcessivaProblemasSuspeitos : '*'}`
    const TransporteProblemasSuspeitos = `${req.body.TransporteProblemasSuspeitos ? req.body.TransporteProblemasSuspeitos : '*'} ${req.body.AereoProblemasSuspeitos ? req.body.AereoProblemasSuspeitos : '*'} ${req.body.ClinicoProblemasSuspeitos ? req.body.ClinicoProblemasSuspeitos : '*'} ${req.body.EmergencialProblemasSuspeitos ? req.body.EmergencialProblemasSuspeitos : '*'} ${req.body.PosTraumaProblemasSuspeitos ? req.body.PosTraumaProblemasSuspeitos : '*'} ${req.body.SamuProblemasSuspeitos ? req.body.SamuProblemasSuspeitos : '*'} ${req.body.SemRemocaoProblemasSuspeitos ? req.body.SemRemocaoProblemasSuspeitos : '*'} ${req.body.ValorOutroTransporteProblemasSuspeitos.length > 0 ? req.body.ValorOutroTransporteProblemasSuspeitos : '*'}`
    var OutroProblemaProblemasSuspeitos = '*'
    if (req.body.OutroProblemaProblemasSuspeitos === 'on' && req.body.ValorOutroProblemaProblemasSuspeitos.length > 0){
        OutroProblemaProblemasSuspeitos = req.body.ValorOutroProblemaProblemasSuspeitos
    }
    //Accordion Sinais e Sintomas
    

    console.log(`
    -----> Dados Paciente <-----
    Data: ${DataDadosPaciente}
    Sexo: ${SexoDadosPaciente}
    Nome Hospital: ${NomeHospitalDadosPaciente}
    Nome Paciente: ${NomePacienteDadosPaciente}
    Documento: ${CpfDadosPaciente +' '+ RgDadosPaciente}
    Fone Paciente: ${FonePacienteDadosPaciente}
    Idade Paciente: ${IdadePacienteDadosPaciente}
    Nome Acompanhante: ${NomeAcompanhanteDadosPaciente}
    Idade Acompanhante: ${IdadeAcompanhanteDadosPaciente}
    Local Ocorrência: ${LocalOcorrenciaDadosPaciente}

    -----> Dados Ocorrencia <-----
    N° USB: ${NumeroUsbDadosOcorrencia}
    DESP: ${DespDadosOcorrencia}
    H. CH: ${HCHDadosOcorrencia}
    KM Final: ${KmFinalDadosOcorrencia}
    Código: ${CodDadosOcorrencia}
    CÓD. SIA/SUS: ${CodSiaSusDadosOcorrencia}

    -----> Tipo de Ocorrência <-----
    ${TipoOcorrencia}

    -----> Problemas Encontrados Suspeitos <-----
    ${PsiquiatricoProblemasSuspeitos}
    ${RespiratorioProblemasSuspeitos}
    ${DiabetesProblemasSuspeitos}
    ${ObstetricoProblemasSuspeitos}
    ${TransporteProblemasSuspeitos}
    ${OutroProblemaProblemasSuspeitos}

    -----> Sinais e Sintomas <-----

    `) 

    res.render('ocorrencia') 
})


app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}`)
})