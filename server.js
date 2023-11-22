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
    const CpfDadosPaciente = req.body.CpfDadosPaciente
    const RgDadosPaciente = req.body.RgDadosPaciente
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
    const TipoOcorrencia = req.body.TipoOcorrencia ? req.body.TipoOcorrencia : ''
    //Accordion Problemas Encontrados Suspeitos
    const PsiquiatricoProblemasSuspeitos = req.body.PsiquiatricoProblemasSuspeitos ? req.body.PsiquiatricoProblemasSuspeitos : ''
    const RespiratorioProblemasSuspeitos = `${req.body.RespiratorioProblemasSuspeitos ? req.body.RespiratorioProblemasSuspeitos : ''} ${req.body.DPOCProblemasSuspeitos ? req.body.DPOCProblemasSuspeitos : ''} ${req.body.InalacaoFumacaProblemasSuspeitos ? req.body.InalacaoFumacaProblemasSuspeitos : ''}`
    const DiabetesProblemasSuspeitos = `${req.body.DiabetesProblemasSuspeitos ? req.body.DiabetesProblemasSuspeitos : ''} ${req.body.HiperglicemiaProblemasSuspeitos ? req.body.HiperglicemiaProblemasSuspeitos : ''} ${req.body.HipoglicemiaProblemasSuspeitos? req.body.HipoglicemiaProblemasSuspeitos : ''}`
    const ObstetricoProblemasSuspeitos = `${req.body.ObstetricoProblemasSuspeitos ? req.body.ObstetricoProblemasSuspeitos : '' } ${req.body.PartoEmergencialProblemasSuspeitos ? req.body.PartoEmergencialProblemasSuspeitos : '' } ${req.body.GestanteProblemasSuspeitos ? req.body.GestanteProblemasSuspeitos : ''} ${req.body.HemorExcessivaProblemasSuspeitos ? req.body.HemorExcessivaProblemasSuspeitos : ''}`
    const TransporteProblemasSuspeitos = `${req.body.TransporteProblemasSuspeitos ? req.body.TransporteProblemasSuspeitos : ''} ${req.body.AereoProblemasSuspeitos ? req.body.AereoProblemasSuspeitos : ''} ${req.body.ClinicoProblemasSuspeitos ? req.body.ClinicoProblemasSuspeitos : ''} ${req.body.EmergencialProblemasSuspeitos ? req.body.EmergencialProblemasSuspeitos : ''} ${req.body.PosTraumaProblemasSuspeitos ? req.body.PosTraumaProblemasSuspeitos : ''} ${req.body.SamuProblemasSuspeitos ? req.body.SamuProblemasSuspeitos : ''} ${req.body.SemRemocaoProblemasSuspeitos ? req.body.SemRemocaoProblemasSuspeitos : ''} ${req.body.ValorOutroTransporteProblemasSuspeitos.length > 0 ? req.body.ValorOutroTransporteProblemasSuspeitos : ''}`
    var OutroProblemaProblemasSuspeitos = ''
    if (req.body.OutroProblemaProblemasSuspeitos === 'on' && req.body.ValorOutroProblemaProblemasSuspeitos.length > 0){
        OutroProblemaProblemasSuspeitos = req.body.ValorOutroProblemaProblemasSuspeitos
    }
    //Accordion Sinais e Sintomas
    const AbdomenSinaiseSintomas = req.body.AbdomenSinaiseSintomas ? req.body.AbdomenSinaiseSintomas : ''
    const AfundamentoSinaiseSintomas = req.body.AfundamentoSinaiseSintomas ? req.body.AfundamentoSinaiseSintomas : ''
    const AgitacaoSinaiseSintomas = req.body.AgitacaoSinaiseSintomas ? req.body.AgitacaoSinaiseSintomas : ''
    const AmnesiaSinaiseSintomas = req.body.AmnesiaSinaiseSintomas ? req.body.AmnesiaSinaiseSintomas : ''
    const AnginaSinaiseSintomas = req.body.AnginaSinaiseSintomas ? req.body.AnginaSinaiseSintomas : ''
    const ApineiaSinaiseSintomas = req.body.ApineiaSinaiseSintomas ? req.body.ApineiaSinaiseSintomas : ''
    const BradicardiaSinaiseSintomas = req.body.BradicardiaSinaiseSintomas ? req.body.BradicardiaSinaiseSintomas : ''
    const BradipneiaSinaiseSintomas = req.body.BradipneiaSinaiseSintomas ? req.body.BradipneiaSinaiseSintomas : ''
    const BroncoSinaiseSintomas = req.body.BroncoSinaiseSintomas ? req.body.BroncoSinaiseSintomas : ''
    const CefaleiaSinaiseSintomas = req.body.CefaleiaSinaiseSintomas ? req.body.CefaleiaSinaiseSintomas : ''
    const CianoseSinaiseSintomas = `${req.body.CianoseSinaiseSintomas ? req.body.CianoseSinaiseSintomas : ''} ${req.body.LabiosSinaiseSintomas ? req.body.LabiosSinaiseSintomas : ''} ${req.body.ExtremidadeSinaiseSintomas ? req.body.ExtremidadeSinaiseSintomas : ''}`
    const ConvulsaoSinaiseSintomas = req.body.ConvulsaoSinaiseSintomas ? req.body.ConvulsaoSinaiseSintomas : ''
    const DecorticacaoSinaiseSintomas = req.body.DecorticacaoSinaiseSintomas ? req.body.DecorticacaoSinaiseSintomas : ''
    const DeformidadeSinaiseSintomas = req.body.DeformidadeSinaiseSintomas ? req.body.DeformidadeSinaiseSintomas : ''
    const DescerebracaoSinaiseSintomas = req.body.DescerebracaoSinaiseSintomas ? req.body.DescerebracaoSinaiseSintomas : ''
    const DesmaioSinaiseSintomas = req.body.DesmaioSinaiseSintomas ? req.body.DesmaioSinaiseSintomas : ''
    const DesvioSinaiseSintomas = req.body.DesvioSinaiseSintomas ? req.body.DesvioSinaiseSintomas : ''
    const DispneiaSinaiseSintomas = req.body.DispneiaSinaiseSintomas ? req.body.DispneiaSinaiseSintomas : ''
    const DorSinaiseSintomas = req.body.DorSinaiseSintomas ? req.body.DorSinaiseSintomas : ''
    const EdemaSinaiseSintomas = `${req.body.EdemaSinaiseSintomas ? req.body.EdemaSinaiseSintomas : ''} ${req.body.GeneralizadoSinaiseSintomas ? req.body.GeneralizadoSinaiseSintomas : ''} ${req.body.LocalizadoSinaiseSintomas ? req.body.LocalizadoSinaiseSintomas : ''}`
    const EstaseSinaiseSintomas = req.body.EstaseSinaiseSintomas ? req.body.EstaseSinaiseSintomas : ''
    const FaceSinaiseSintomas = req.body.FaceSinaiseSintomas ? req.body.FaceSinaiseSintomas : ''
    const HemorragiaSinaiseSintomas = `${req.body.HemorragiaSinaiseSintomas ? req.body.HemorragiaSinaiseSintomas : ''} ${req.body.InternaSinaiseSintomas ? req.body.InternaSinaiseSintomas : ''} ${req.body.ExternaSinaiseSintomas ? req.body.ExternaSinaiseSintomas : ''}`
    const HipertensaoSinaiseSintomas = req.body.HipertensaoSinaiseSintomas ? req.body.HipertensaoSinaiseSintomas : ''
    const HipotensaoSinaiseSintomas = req.body.HipotensaoSinaiseSintomas ? req.body.HipotensaoSinaiseSintomas : ''
    const NauseasSinaiseSintomas = req.body.NauseasSinaiseSintomas ? req.body.NauseasSinaiseSintomas : ''
    const NasoragiaSinaiseSintomas = req.body.NasoragiaSinaiseSintomas ? req.body.NasoragiaSinaiseSintomas : ''
    const IsocoriaSinaiseSintomas = req.body.IsocoriaSinaiseSintomas ? req.body.IsocoriaSinaiseSintomas : ''
    const ObitoSinaiseSintomas = req.body.ObitoSinaiseSintomas ? req.body.ObitoSinaiseSintomas : ''
    const OtorreiaSinaiseSintomas = req.body.OtorreiaSinaiseSintomas ? req.body.OtorreiaSinaiseSintomas : ''
    const OtorragiaSinaiseSintomas = req.body.OtorragiaSinaiseSintomas ? req.body.OtorragiaSinaiseSintomas : ''
    const OVACESinaiseSintomas = req.body.OVACESinaiseSintomas ? req.body.OVACESinaiseSintomas : ''
    const ParadaSinaiseSintomas = `${req.body.ParadaSinaiseSintomas ? req.body.ParadaSinaiseSintomas : ''} ${req.body.CardiacaSinaiseSintomas ? req.body.CardiacaSinaiseSintomas : ''} ${req.body.RespiratoriaSinaiseSintomas ? req.body.RespiratoriaSinaiseSintomas : ''}`
    const PriaprismoSinaiseSintomas = req.body.PriaprismoSinaiseSintomas ? req.body.PriaprismoSinaiseSintomas : ''
    const PruridoSinaiseSintomas = req.body.PruridoSinaiseSintomas ? req.body.PruridoSinaiseSintomas : ''
    const PupilasSinaiseSintomas = `${req.body.PupilasSinaiseSintomas ? req.body.PupilasSinaiseSintomas : ''} ${req.body.AnisocoriaSinaiseSintomas ? req.body.AnisocoriaSinaiseSintomas : ''} ${req.body.MioseSinaiseSintomas ? req.body.MioseSinaiseSintomas : ''} ${req.body.IsocoriaSinaiseSintomas ? req.body.IsocoriaSinaiseSintomas : ''} ${req.body.MidriaseSinaiseSintomas ? req.body.MidriaseSinaiseSintomas : ''} ${req.body.ReagenteSinaiseSintomas ? req.body.ReagenteSinaiseSintomas : ''} ${req.body.NaoReagenteSinaiseSintomas ? req.body.NaoReagenteSinaiseSintomas : ''}`
    const SudoreseSinaiseSintomas = req.body.SudoreseSinaiseSintomas ? req.body.SudoreseSinaiseSintomas : ''
    const TaquipneiaSinaiseSintomas = req.body.TaquipneiaSinaiseSintomas ? req.body.TaquipneiaSinaiseSintomas : ''
    const TaquicardiaSinaiseSintomas = req.body.TaquicardiaSinaiseSintomas ? req.body.TaquicardiaSinaiseSintomas : ''
    var OutroSinaiseSintomas = ''
    if (req.body.OutroSinaiseSintomas === 'on' && req.body.ValorOutroSinaiseSintomas.length > 0){
        OutroSinaiseSintomas = req.body.ValorOutroSinaiseSintomas
    }
    //Accordion Avaliação Paciente
    const AberturaOcularMenor = req.body.AberturaOcularMenor ? req.body.AberturaOcularMenor : ''
    const RespostaVerbalMenor = req.body.RespostaVerbalMenor ? req.body.RespostaVerbalMenor : ''
    const RespostaMotoraMenor = req.body.RespostaMotoraMenor ? req.body.RespostaMotoraMenor : ''
    const TotalGCSMenor = req.body.TotalGCSMenor ? req.body.TotalGCSMenor : ''
    const AberturaOcularMaior = req.body.AberturaOcularMaior ? req.body.AberturaOcularMaior : ''
    const RespostaVerbalMaior = req.body.RespostaVerbalMaior ? req.body.RespostaVerbalMaior : ''
    const RespostaMotoraMaior = req.body.RespostaMotoraMaior ? req.body.RespostaMotoraMaior : ''
    const TotalGCSMaior = req.body.TotalGCSMaior ? req.body.TotalGCSMaior : ''
    //Accordion Sinais Vitais
    const PressaoSinaisVitais = req.body.PressaoSinaisVitais
    const ArterialSinaisVitais = req.body.ArterialSinaisVitais
    const PulsoSinaisVitais = req.body.PulsoSinaisVitais
    const RespiracaoSinaisVitais = req.body.RespiracaoSinaisVitais
    const SaturacaoSinaisVitais = req.body.SaturacaoSinaisVitais
    const HGTSinaisVitais = req.body.HGTSinaisVitais
    const TemperaturaSinaisVitais = req.body.TemperaturaSinaisVitais
    const PerfusaoSinaisVitais = req.body.PerfusaoSinaisVitais ? req.body.PerfusaoSinaisVitais : ''
    const SituacaoSinaisVitais = req.body.SituacaoSinaisVitais ? req.body.SituacaoSinaisVitais : ''
    //Accordion Forma de condução / Vitima era / Objetos Recolhidos
    const FormaConducao = req.body.FormaConducao ? req.body.FormaConducao : ''
    const VitimaEra = req.body.VitimaEra ? req.body.VitimaEra : ''
    const ObjetosRecolhidos = req.body.ObjetosRecolhidos ? req.body.ObjetosRecolhidos : ''
    //Accordion Decisão Transporte / Equipe de Atendimento
    const DecisaoTransporte = req.body.DecisaoTransporte ? req.body.DecisaoTransporte : ''
    const MEquipeAtendimento = req.body.MEquipeAtendimento ? req.body.MEquipeAtendimento : ''
    const S1EquipeAtendimento = req.body.S1EquipeAtendimento ? req.body.S1EquipeAtendimento : ''
    const S2EquipeAtendimento = req.body.S2EquipeAtendimento ? req.body.S2EquipeAtendimento : ''
    const S3EquipeAtendimento = req.body.S3EquipeAtendimento ? req.body.S3EquipeAtendimento : ''
    const EquipeEquipeAtendimento = req.body.EquipeEquipeAtendimento ? req.body.EquipeEquipeAtendimento : ''
    const DemandanteEquipeAtendimento = req.body.DemandanteEquipeAtendimento ? req.body.DemandanteEquipeAtendimento : ''
    //Accordion Procedimentos Efetuados
    const AspiracaoProcedimentosEfetuados = req.body.AspiracaoProcedimentosEfetuados ? req.body.AspiracaoProcedimentosEfetuados : ''
    const AvaliacaoInicialProcedimentosEfetuados = req.body.AvaliacaoInicialProcedimentosEfetuados ? req.body.AvaliacaoInicialProcedimentosEfetuados : ''
    const AvaliacaoDirigidaProcedimentosEfetuados = req.body.AvaliacaoDirigidaProcedimentosEfetuados ? req.body.AvaliacaoDirigidaProcedimentosEfetuados : ''
    const AvaliacaoContinuadaProcedimentosEfetuados = req.body.AvaliacaoContinuadaProcedimentosEfetuados ? req.body.AvaliacaoContinuadaProcedimentosEfetuados : ''
    const ChaveProcedimentosEfetuados = req.body.ChaveProcedimentosEfetuados ? req.body.ChaveProcedimentosEfetuados : ''
    const CanulaProcedimentosEfetuados = req.body.CanulaProcedimentosEfetuados ? req.body.CanulaProcedimentosEfetuados : ''
    const DesobstrucaoProcedimentosEfetuados = req.body.DesobstrucaoProcedimentosEfetuados ? req.body.DesobstrucaoProcedimentosEfetuados : ''
    const EmpregoProcedimentosEfetuados = req.body.EmpregoProcedimentosEfetuados ? req.body.EmpregoProcedimentosEfetuados : ''
    const GerenciamentoProcedimentosEfetuados = req.body.GerenciamentoProcedimentosEfetuados ? req.body.GerenciamentoProcedimentosEfetuados : ''
    const LimpezaProcedimentosEfetuados = req.body.LimpezaProcedimentosEfetuados ? req.body.LimpezaProcedimentosEfetuados : ''
    const CurativosProcedimentosEfetuados = req.body.CurativosProcedimentosEfetuados ? req.body.CurativosProcedimentosEfetuados : ''
    const CompressivoProcedimentosEfetuados = req.body.CompressivoProcedimentosEfetuados ? req.body.CompressivoProcedimentosEfetuados : ''
    const EncravamentoProcedimentosEfetuados = req.body.EncravamentoProcedimentosEfetuados ? req.body.EncravamentoProcedimentosEfetuados : ''
    const OcularProcedimentosEfetuados = req.body.OcularProcedimentosEfetuados ? req.body.OcularProcedimentosEfetuados : ''
    const QueimaduraProcedimentosEfetuados = req.body.QueimaduraProcedimentosEfetuados ? req.body.QueimaduraProcedimentosEfetuados : ''
    const SimplesProcedimentosEfetuados = req.body.SimplesProcedimentosEfetuados ? req.body.SimplesProcedimentosEfetuados : ''
    const _3PontasProcedimentosEfetuados = req.body._3PontasProcedimentosEfetuados ? req.body._3PontasProcedimentosEfetuados : ''
    const ImobilizacoesProcedimentosEfetuados = req.body.ImobilizacoesProcedimentosEfetuados ? req.body.ImobilizacoesProcedimentosEfetuados : ''
    const InferiorDireitoProcedimentosEfetuados = req.body.InferiorDireitoProcedimentosEfetuados ? req.body.InferiorDireitoProcedimentosEfetuados : ''
    const InferiorEsquerdoProcedimentosEfetuados = req.body.InferiorEsquerdoProcedimentosEfetuados ? req.body.InferiorEsquerdoProcedimentosEfetuados : ''
    const SuperiorDireitoProcedimentosEfetuados = req.body.SuperiorDireitoProcedimentosEfetuados ? req.body.SuperiorDireitoProcedimentosEfetuados : ''
    const SuperiorEsquerdoProcedimentosEfetuados = req.body.SuperiorEsquerdoProcedimentosEfetuados ? req.body.SuperiorEsquerdoProcedimentosEfetuados : ''
    const QuadrilProcedimentosEfetuados = req.body.QuadrilProcedimentosEfetuados ? req.body.QuadrilProcedimentosEfetuados : ''
    const CervicalProcedimentosEfetuados = req.body.CervicalProcedimentosEfetuados ? req.body.CervicalProcedimentosEfetuados : ''
    const MacaRodasProcedimentosEfetuados = req.body.MacaRodasProcedimentosEfetuados ? req.body.MacaRodasProcedimentosEfetuados : ''
    const MacaRigidaProcedimentosEfetuados = req.body.MacaRigidaProcedimentosEfetuados ? req.body.MacaRigidaProcedimentosEfetuados : ''
    const PonteProcedimentosEfetuados = req.body.PonteProcedimentosEfetuados ? req.body.PonteProcedimentosEfetuados : ''
    const RetiradoProcedimentosEfetuados = req.body.RetiradoProcedimentosEfetuados ? req.body.RetiradoProcedimentosEfetuados : ''
    const RCPProcedimentosEfetuados = req.body.RCPProcedimentosEfetuados ? req.body.RCPProcedimentosEfetuados : ''
    const _90ProcedimentosEfetuados = req.body._90ProcedimentosEfetuados ? req.body._90ProcedimentosEfetuados : ''
    const _180ProcedimentosEfetuados = req.body._180ProcedimentosEfetuados ? req.body._180ProcedimentosEfetuados : ''
    const TomadaProcedimentosEfetuados = req.body.TomadaProcedimentosEfetuados ? req.body.TomadaProcedimentosEfetuados : ''
    const TratadoProcedimentosEfetuados = req.body.TratadoProcedimentosEfetuados ? req.body.TratadoProcedimentosEfetuados : ''
    const UsoProcedimentosEfetuados = req.body.UsoProcedimentosEfetuados ? req.body.UsoProcedimentosEfetuados : ''
    const ColarProcedimentosEfetuados = req.body.ColarProcedimentosEfetuados ? req.body.ColarProcedimentosEfetuados : ''
    const TTFProcedimentosEfetuados = req.body.TTFProcedimentosEfetuados ? req.body.TTFProcedimentosEfetuados : ''
    const VentilacaoProcedimentosEfetuados = req.body.VentilacaoProcedimentosEfetuados ? req.body.VentilacaoProcedimentosEfetuados : ''
    const OxigenioterapiaProcedimentosEfetuados = req.body.OxigenioterapiaProcedimentosEfetuados ? req.body.OxigenioterapiaProcedimentosEfetuados : ''
    const ReanimadorProcedimentosEfetuados = req.body.ReanimadorProcedimentosEfetuados ? req.body.ReanimadorProcedimentosEfetuados : ''
    const MeiosProcedimentosEfetuados = req.body.MeiosProcedimentosEfetuados ? req.body.MeiosProcedimentosEfetuados : ''
    const CelescProcedimentosEfetuados = req.body.CelescProcedimentosEfetuados ? req.body.CelescProcedimentosEfetuados : ''
    const PoliciaProcedimentosEfetuados = req.body.PoliciaProcedimentosEfetuados ? req.body.PoliciaProcedimentosEfetuados : ''
    const DefCivilProcedimentosEfetuados = req.body.DefCivilProcedimentosEfetuados ? req.body.DefCivilProcedimentosEfetuados : ''
    const IGPPCProcedimentosEfetuados = req.body.IGPPCProcedimentosEfetuados ? req.body.IGPPCProcedimentosEfetuados : ''
    const SamuProcedimentosEfetuados = req.body.SamuProcedimentosEfetuados ? req.body.SamuProcedimentosEfetuados : ''
    const CITProcedimentosEfetuados = req.body.CITProcedimentosEfetuados ? req.body.CITProcedimentosEfetuados : ''
    const OutroProcedimentosEfetuados = req.body.OutroProcedimentosEfetuados ? req.body.OutroProcedimentosEfetuados : ''
    //Accordion Anamnese Emergência Médica / Gestacional
    //Medica
    const OqueMedica = req.body.OqueMedica ? req.body.OqueMedica : ''



    //Accordion Avaliação Cinemática
    const DisturbioAvaliacaoCinematica = req.body.DisturbioAvaliacaoCinematica ? req.body.DisturbioAvaliacaoCinematica : ''
    const EncontradoCapaceteAvaliacaoCinematica = req.body.EncontradoCapaceteAvaliacaoCinematica ? req.body.EncontradoCapaceteAvaliacaoCinematica : ''
    const EncontradoCintoAvaliacaoCinematica = req.body.EncontradoCintoAvaliacaoCinematica ? req.body.EncontradoCintoAvaliacaoCinematica : ''
    const ParaBrisasAvariadoAvaliacaoCinematica = req.body.ParaBrisasAvariadoAvaliacaoCinematica ? req.body.ParaBrisasAvariadoAvaliacaoCinematica : ''
    const CaminhandoAvaliacaoCinematica = req.body.CaminhandoAvaliacaoCinematica ? req.body.CaminhandoAvaliacaoCinematica : ''
    const PainelAvariadoAvaliacaoCinematica = req.body.PainelAvariadoAvaliacaoCinematica ? req.body.PainelAvariadoAvaliacaoCinematica : ''
    const VolanteRetorcidoAvaliacaoCinematica = req.body.VolanteRetorcidoAvaliacaoCinematica ? req.body.VolanteRetorcidoAvaliacaoCinematica : ''
    //Accordion Termo de Recusa de Atendimento E/OU Transporte


    console.log(`
    -----> Dados Paciente <-----
    Data: ${DataDadosPaciente}
    Sexo: ${SexoDadosPaciente ? SexoDadosPaciente : ''}
    Nome Hospital: ${NomeHospitalDadosPaciente}
    Nome Paciente: ${NomePacienteDadosPaciente}
    Documento: CPF ${CpfDadosPaciente} RG ${RgDadosPaciente}
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
    ${AbdomenSinaiseSintomas}
    ${AfundamentoSinaiseSintomas}
    ${AgitacaoSinaiseSintomas}
    ${AmnesiaSinaiseSintomas}
    ${AnginaSinaiseSintomas}
    ${ApineiaSinaiseSintomas}
    ${BradicardiaSinaiseSintomas}
    ${BradipneiaSinaiseSintomas}
    ${BroncoSinaiseSintomas}
    ${CefaleiaSinaiseSintomas}
    ${CianoseSinaiseSintomas}
    ${ConvulsaoSinaiseSintomas}
    ${DecorticacaoSinaiseSintomas}
    ${DeformidadeSinaiseSintomas}
    ${DescerebracaoSinaiseSintomas}
    ${DesmaioSinaiseSintomas}
    ${DesvioSinaiseSintomas}
    ${DispneiaSinaiseSintomas}
    ${DorSinaiseSintomas}
    ${EdemaSinaiseSintomas}
    ${EstaseSinaiseSintomas}
    ${FaceSinaiseSintomas}
    ${HemorragiaSinaiseSintomas}
    ${HipertensaoSinaiseSintomas}
    ${HipotensaoSinaiseSintomas}
    ${NauseasSinaiseSintomas}
    ${NasoragiaSinaiseSintomas}
    ${IsocoriaSinaiseSintomas}
    ${ObitoSinaiseSintomas}
    ${OtorreiaSinaiseSintomas}
    ${OtorragiaSinaiseSintomas}
    ${OVACESinaiseSintomas}
    ${ParadaSinaiseSintomas}
    ${PriaprismoSinaiseSintomas}
    ${PruridoSinaiseSintomas}
    ${PupilasSinaiseSintomas}
    ${SudoreseSinaiseSintomas}
    ${TaquipneiaSinaiseSintomas}
    ${TaquicardiaSinaiseSintomas}
    ${OutroSinaiseSintomas}

    -----> Avaliação Paciente Menor 5 anos <-----
    Abertura Ocular: ${AberturaOcularMenor}
    Resposta Verbal: ${RespostaVerbalMenor}
    Resposta Motora: ${RespostaMotoraMenor}
    Total (GCS) (3-15): ${TotalGCSMenor}

    -----> Avaliação Paciente Maior 5 anos <-----
    Abertura Ocular: ${AberturaOcularMaior}
    Resposta Verbal: ${RespostaVerbalMaior}
    Resposta Motora: ${RespostaMotoraMaior}
    Total (GCS) (3-15): ${TotalGCSMaior}

    -----> Localização Traumas <-----
    [ERRO] Não há disponível essa funcionalidade.

    -----> Sinais Vitais <-----
    Pressão Arterial: ${PressaoSinaisVitais} x ${ArterialSinaisVitais} mmHg
    Pulso: ${PulsoSinaisVitais} B.C.P.M
    Respiração: ${RespiracaoSinaisVitais} M.R.M.
    Saturação: ${SaturacaoSinaisVitais} %
    HGT: ${HGTSinaisVitais}
    Temperatura: ${TemperaturaSinaisVitais} °C
    Perfusão: ${PerfusaoSinaisVitais}
    Situação: ${SituacaoSinaisVitais}

    -----> Forma de condução / Vitima era / Objetos Recolhidos <-----
    Forma Condução: ${FormaConducao}
    Vitima era: ${VitimaEra}
    Objetos Recolhidos: ${ObjetosRecolhidos}

    -----> Decisão Transporte / Equipe de Atendimento <-----
    Decisão Transporte: ${DecisaoTransporte}
    M: ${MEquipeAtendimento}
    S1: ${S1EquipeAtendimento}
    S2: ${S2EquipeAtendimento}
    S3: ${S3EquipeAtendimento}
    Equipe: ${EquipeEquipeAtendimento}
    Demandante: ${DemandanteEquipeAtendimento}

    -----> Procedimentos efetuados <-----
    ${AspiracaoProcedimentosEfetuados}
    ${AvaliacaoInicialProcedimentosEfetuados}
    ${AvaliacaoDirigidaProcedimentosEfetuados}
    ${AvaliacaoContinuadaProcedimentosEfetuados}
    ${ChaveProcedimentosEfetuados}
    ${CanulaProcedimentosEfetuados}
    ${DesobstrucaoProcedimentosEfetuados}
    ${EmpregoProcedimentosEfetuados}
    ${GerenciamentoProcedimentosEfetuados}
    ${LimpezaProcedimentosEfetuados}
    ${CurativosProcedimentosEfetuados}
    ${CompressivoProcedimentosEfetuados}
    ${EncravamentoProcedimentosEfetuados}
    ${OcularProcedimentosEfetuados}
    ${QueimaduraProcedimentosEfetuados}
    ${SimplesProcedimentosEfetuados}
    ${_3PontasProcedimentosEfetuados}
    ${ImobilizacoesProcedimentosEfetuados}
    ${InferiorDireitoProcedimentosEfetuados}
    ${InferiorEsquerdoProcedimentosEfetuados}
    ${SuperiorDireitoProcedimentosEfetuados}
    ${SuperiorEsquerdoProcedimentosEfetuados}
    ${QuadrilProcedimentosEfetuados}
    ${CervicalProcedimentosEfetuados}
    ${MacaRodasProcedimentosEfetuados}
    ${MacaRigidaProcedimentosEfetuados}
    ${PonteProcedimentosEfetuados}
    ${RetiradoProcedimentosEfetuados}
    ${RCPProcedimentosEfetuados}
    ${_90ProcedimentosEfetuados}
    ${_180ProcedimentosEfetuados}
    ${TomadaProcedimentosEfetuados}
    ${TratadoProcedimentosEfetuados}
    ${UsoProcedimentosEfetuados}
    ${ColarProcedimentosEfetuados}
    ${TTFProcedimentosEfetuados}
    ${VentilacaoProcedimentosEfetuados}
    ${OxigenioterapiaProcedimentosEfetuados}
    ${ReanimadorProcedimentosEfetuados}
    ${MeiosProcedimentosEfetuados}
    ${CelescProcedimentosEfetuados}
    ${PoliciaProcedimentosEfetuados}
    ${DefCivilProcedimentosEfetuados}
    ${IGPPCProcedimentosEfetuados}
    ${SamuProcedimentosEfetuados}
    ${CITProcedimentosEfetuados}
    ${OutroProcedimentosEfetuados}

    -----> Anamnese emergência médica / Gestacional <-----
    *emergência médica*
    O Que Aconteceu (Sinais e Sintomas): ${OqueMedica}
    Aconteceu outras vezes: ${OutrasVezesMedica}
    A quanto tempo aconteceu: ${QuantoTempoMedica}
    Possui algum problema de saúde: ${ProblemaMedica}
    Quais Problemas: ${QualProblemaMedica}
    Faz uso de medicação: ${MedicacaoMedica}
    Horário da última medicação: ${HorarioMedicacaoMedica}
    Qual medicação: ${QualMedicacaoMedica}
    Alérgico: ${AlergicoMedica}
    Qual alergia: ${QualAlergicoMedica}
    Inseriu alimento ou líquido ≥ 6 horas: ${IngeriuMedica}
    Horário da ingestão: ${HorarioIngeriuMedica}
    
    *gestacional*
    Fez Pré-natal: ${}
    Período Gestacional: ${}
    Nome do médico: ${}
    Existe Probabilidade de Complicações: ${}
    É o primeiro filho: ${}
    Quantos: ${}
    Que horas iniciaram as contrações: ${}
    Duração: ${}
    Intervalo: ${}
    Pressão na Região do Quadril ou Vontade de Evacuar: ${}
    Já Houve Ruptura da Bolsa: ${}
    Foi Feito a Inspeção Visual: ${}
    Parto Realizado: ${}
    Hora do Nascimento: ${}
    Sexo do bebê: ${}
    Nome do bebê: ${}
    -----> Materiais Ultilizados Descartáveis <-----

    -----> Materiais Ultilizados Deixado no Hospital <-----

    -----> Avaliação Cinemática <-----
    Distúrbio de Comportamento: ${DisturbioAvaliacaoCinematica}
    Encontrado de Capacete: ${EncontradoCapaceteAvaliacaoCinematica}
    Encontrado de Cinto: ${EncontradoCintoAvaliacaoCinematica}
    Para-Brisas Avariado: ${ParaBrisasAvariadoAvaliacaoCinematica}
    Caminhando na Cena: ${CaminhandoAvaliacaoCinematica}
    Painel Avariado: ${PainelAvariadoAvaliacaoCinematica}
    Volante Retorcido: ${VolanteRetorcidoAvaliacaoCinematica}

    -----> Termo de Recusa de Atendimento E/OU Transporte <-----
    
    `) 

    res.render('ocorrencia') 
})


app.listen(port, ()=>{
    console.log(`Servidor Rodando na porta ${port}`)
})