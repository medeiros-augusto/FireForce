const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql2')


const port = 3010;
var path = require('path')
const app = express()

app.use(session({ secret: 'gsdgsdfqfq2f3fd' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'noar2',
});

connection.connect(function (err) {
    if (!err) {
        console.log("Conexão como o Banco realizada com sucesso!!!")
    } else {
        console.log("Erro: Conexão NÃO realizada", err)
    }
});

app.get('/', (req, res) => {
    if (req.session.nomelogin == 'adm') {
        res.render('painel_adm')
    } else if (req.session.nomelogin) {
        res.render('home', { login: global.nomelogin })
    } else {
        res.render('login')
    }
})

app.get('/ocorrencia', (req, res) => {
    if (req.session.nomelogin) {
        res.render('ocorrencia');
    } else (
        res.send("[ERRO] Necessário realizar login!")
    )
});

app.get('/historico', (req, res) => {
    if (req.session.nomelogin) {
        res.render('historico');
    } else (
        res.send("[ERRO] Necessário realizar login!")
    )
});

app.get('/usuarios', (req, res) => {
    if (req.session.nomelogin == 'adm') {
        res.render('usuarios');
    } else (
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

app.get('/getOcorrencia', (req, res) => {
    connection.query('SELECT id_ocorrencia, DataDadosPaciente, NomePacienteDadosPaciente FROM ocorrencia', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        } else {
            res.status(200).json(results);
        }
    });
});


app.get('/criar_usuario', (req, res) => {
    if (req.session.nomelogin === 'adm') {
        res.render('criar_usuario')
    } else {
        res.send("[ERRO] Usuário logado não é Administrador!")
    }
})

app.post('/', (req, res) => {
    global.nomelogin = req.body.nomelogin
    let senha = req.body.senhalogin

    connection.query("SELECT * FROM usuario where nome_usuario = '" + global.nomelogin + "'", function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].senha_usuario === senha) {
                    req.session.nomelogin = global.nomelogin
                    if (req.session.nomelogin == 'adm') {
                        res.render('painel_adm', { login: global.nomelogin })
                    } else {
                        res.render('home', { login: global.nomelogin })
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
    const DataDadosPaciente = req.body.DataDadosPaciente ? req.body.DataDadosPaciente : '*'
    const SexoDadosPaciente = req.body.SexoDadosPaciente ? req.body.SexoDadosPaciente : '*'
    const NomeHospitalDadosPaciente = req.body.NomeHospitalDadosPaciente ? req.body.NomeHospitalDadosPaciente : '*'
    const NomePacienteDadosPaciente = req.body.NomePacienteDadosPaciente ? req.body.NomePacienteDadosPaciente : '*'
    const CpfDadosPaciente = req.body.CpfDadosPaciente ? req.body.CpfDadosPaciente : '*'
    const RgDadosPaciente = req.body.RgDadosPaciente ? req.body.RgDadosPaciente : '*'
    const FonePacienteDadosPaciente = req.body.FonePacienteDadosPaciente ? req.body.FonePacienteDadosPaciente : '*'
    const IdadePacienteDadosPaciente = req.body.IdadePacienteDadosPaciente ? req.body.IdadePacienteDadosPaciente : '*'
    const NomeAcompanhanteDadosPaciente = req.body.NomeAcompanhanteDadosPaciente ? req.body.NomeAcompanhanteDadosPaciente : '*'
    const IdadeAcompanhanteDadosPaciente = req.body.IdadeAcompanhanteDadosPaciente ? req.body.IdadeAcompanhanteDadosPaciente : '*'
    const LocalOcorrenciaDadosPaciente = req.body.LocalOcorrenciaDadosPaciente ? req.body.LocalOcorrenciaDadosPaciente : '*'
    //Accordion Dados Ocorrencia
    const NumeroUsbDadosOcorrencia = req.body.NumeroUsbDadosOcorrencia ? req.body.NumeroUsbDadosOcorrencia : '*'
    const DespDadosOcorrencia = req.body.DespDadosOcorrencia ? req.body.DespDadosOcorrencia : '*'
    const HCHDadosOcorrencia = req.body.HCHDadosOcorrencia ? req.body.HCHDadosOcorrencia : '*'
    const KmFinalDadosOcorrencia = req.body.KmFinalDadosOcorrencia ? req.body.KmFinalDadosOcorrencia : '*'
    const CodDadosOcorrencia = req.body.CodDadosOcorrencia ? req.body.CodDadosOcorrencia : '*'
    const CodSiaSusDadosOcorrencia = req.body.CodSiaSusDadosOcorrencia ? req.body.CodSiaSusDadosOcorrencia : '*'
    //Accordion Tipo de Ocorrencia
    const TipoOcorrencia = req.body.TipoOcorrencia ? req.body.TipoOcorrencia : '*'
    //Accordion Problemas Encontrados Suspeitos
    const PsiquiatricoProblemasSuspeitos = req.body.PsiquiatricoProblemasSuspeitos ? req.body.PsiquiatricoProblemasSuspeitos : '*'
    const RespiratorioProblemasSuspeitos = `${req.body.RespiratorioProblemasSuspeitos ? req.body.RespiratorioProblemasSuspeitos : '*'} ${req.body.DPOCProblemasSuspeitos ? req.body.DPOCProblemasSuspeitos : '*'} ${req.body.InalacaoFumacaProblemasSuspeitos ? req.body.InalacaoFumacaProblemasSuspeitos : '*'}`
    const DiabetesProblemasSuspeitos = `${req.body.DiabetesProblemasSuspeitos ? req.body.DiabetesProblemasSuspeitos : '*'} ${req.body.HiperglicemiaProblemasSuspeitos ? req.body.HiperglicemiaProblemasSuspeitos : '*'} ${req.body.HipoglicemiaProblemasSuspeitos ? req.body.HipoglicemiaProblemasSuspeitos : '*'}`
    const ObstetricoProblemasSuspeitos = `${req.body.ObstetricoProblemasSuspeitos ? req.body.ObstetricoProblemasSuspeitos : '*'} ${req.body.PartoEmergencialProblemasSuspeitos ? req.body.PartoEmergencialProblemasSuspeitos : '*'} ${req.body.GestanteProblemasSuspeitos ? req.body.GestanteProblemasSuspeitos : '*'} ${req.body.HemorExcessivaProblemasSuspeitos ? req.body.HemorExcessivaProblemasSuspeitos : '*'}`
    const TransporteProblemasSuspeitos = `${req.body.TransporteProblemasSuspeitos ? req.body.TransporteProblemasSuspeitos : '*'} ${req.body.AereoProblemasSuspeitos ? req.body.AereoProblemasSuspeitos : '*'} ${req.body.ClinicoProblemasSuspeitos ? req.body.ClinicoProblemasSuspeitos : '*'} ${req.body.EmergencialProblemasSuspeitos ? req.body.EmergencialProblemasSuspeitos : '*'} ${req.body.PosTraumaProblemasSuspeitos ? req.body.PosTraumaProblemasSuspeitos : '*'} ${req.body.SamuProblemasSuspeitos ? req.body.SamuProblemasSuspeitos : '*'} ${req.body.SemRemocaoProblemasSuspeitos ? req.body.SemRemocaoProblemasSuspeitos : '*'} ${req.body.ValorOutroTransporteProblemasSuspeitos.length > 0 ? req.body.ValorOutroTransporteProblemasSuspeitos : '*'}`
    var OutroProblemaProblemasSuspeitos = '*'
    if (req.body.OutroProblemaProblemasSuspeitos === 'on' && req.body.ValorOutroProblemaProblemasSuspeitos.length > 0) {
        OutroProblemaProblemasSuspeitos = req.body.ValorOutroProblemaProblemasSuspeitos
    }
    //Accordion Sinais e Sintomas
    const AbdomenSinaiseSintomas = req.body.AbdomenSinaiseSintomas ? req.body.AbdomenSinaiseSintomas : '*'
    const AfundamentoSinaiseSintomas = req.body.AfundamentoSinaiseSintomas ? req.body.AfundamentoSinaiseSintomas : '*'
    const AgitacaoSinaiseSintomas = req.body.AgitacaoSinaiseSintomas ? req.body.AgitacaoSinaiseSintomas : '*'
    const AmnesiaSinaiseSintomas = req.body.AmnesiaSinaiseSintomas ? req.body.AmnesiaSinaiseSintomas : '*'
    const AnginaSinaiseSintomas = req.body.AnginaSinaiseSintomas ? req.body.AnginaSinaiseSintomas : '*'
    const ApineiaSinaiseSintomas = req.body.ApineiaSinaiseSintomas ? req.body.ApineiaSinaiseSintomas : '*'
    const BradicardiaSinaiseSintomas = req.body.BradicardiaSinaiseSintomas ? req.body.BradicardiaSinaiseSintomas : '*'
    const BradipneiaSinaiseSintomas = req.body.BradipneiaSinaiseSintomas ? req.body.BradipneiaSinaiseSintomas : '*'
    const BroncoSinaiseSintomas = req.body.BroncoSinaiseSintomas ? req.body.BroncoSinaiseSintomas : '*'
    const CefaleiaSinaiseSintomas = req.body.CefaleiaSinaiseSintomas ? req.body.CefaleiaSinaiseSintomas : '*'
    const CianoseSinaiseSintomas = `${req.body.CianoseSinaiseSintomas ? req.body.CianoseSinaiseSintomas : '*'} ${req.body.LabiosSinaiseSintomas ? req.body.LabiosSinaiseSintomas : '*'} ${req.body.ExtremidadeSinaiseSintomas ? req.body.ExtremidadeSinaiseSintomas : '*'}`
    const ConvulsaoSinaiseSintomas = req.body.ConvulsaoSinaiseSintomas ? req.body.ConvulsaoSinaiseSintomas : '*'
    const DecorticacaoSinaiseSintomas = req.body.DecorticacaoSinaiseSintomas ? req.body.DecorticacaoSinaiseSintomas : '*'
    const DeformidadeSinaiseSintomas = req.body.DeformidadeSinaiseSintomas ? req.body.DeformidadeSinaiseSintomas : '*'
    const DescerebracaoSinaiseSintomas = req.body.DescerebracaoSinaiseSintomas ? req.body.DescerebracaoSinaiseSintomas : '*'
    const DesmaioSinaiseSintomas = req.body.DesmaioSinaiseSintomas ? req.body.DesmaioSinaiseSintomas : '*'
    const DesvioSinaiseSintomas = req.body.DesvioSinaiseSintomas ? req.body.DesvioSinaiseSintomas : '*'
    const DispneiaSinaiseSintomas = req.body.DispneiaSinaiseSintomas ? req.body.DispneiaSinaiseSintomas : '*'
    const DorSinaiseSintomas = req.body.DorSinaiseSintomas ? req.body.DorSinaiseSintomas : '*'
    const EdemaSinaiseSintomas = `${req.body.EdemaSinaiseSintomas ? req.body.EdemaSinaiseSintomas : '*'} ${req.body.GeneralizadoSinaiseSintomas ? req.body.GeneralizadoSinaiseSintomas : '*'} ${req.body.LocalizadoSinaiseSintomas ? req.body.LocalizadoSinaiseSintomas : '*'}`
    const EstaseSinaiseSintomas = req.body.EstaseSinaiseSintomas ? req.body.EstaseSinaiseSintomas : '*'
    const FaceSinaiseSintomas = req.body.FaceSinaiseSintomas ? req.body.FaceSinaiseSintomas : '*'
    const HemorragiaSinaiseSintomas = `${req.body.HemorragiaSinaiseSintomas ? req.body.HemorragiaSinaiseSintomas : '*'} ${req.body.InternaSinaiseSintomas ? req.body.InternaSinaiseSintomas : '*'} ${req.body.ExternaSinaiseSintomas ? req.body.ExternaSinaiseSintomas : '*'}`
    const HipertensaoSinaiseSintomas = req.body.HipertensaoSinaiseSintomas ? req.body.HipertensaoSinaiseSintomas : '*'
    const HipotensaoSinaiseSintomas = req.body.HipotensaoSinaiseSintomas ? req.body.HipotensaoSinaiseSintomas : '*'
    const NauseasSinaiseSintomas = req.body.NauseasSinaiseSintomas ? req.body.NauseasSinaiseSintomas : '*'
    const NasoragiaSinaiseSintomas = req.body.NasoragiaSinaiseSintomas ? req.body.NasoragiaSinaiseSintomas : '*'
    const IsocoriaSinaiseSintomas = req.body.IsocoriaSinaiseSintomas ? req.body.IsocoriaSinaiseSintomas : '*'
    const ObitoSinaiseSintomas = req.body.ObitoSinaiseSintomas ? req.body.ObitoSinaiseSintomas : '*'
    const OtorreiaSinaiseSintomas = req.body.OtorreiaSinaiseSintomas ? req.body.OtorreiaSinaiseSintomas : '*'
    const OtorragiaSinaiseSintomas = req.body.OtorragiaSinaiseSintomas ? req.body.OtorragiaSinaiseSintomas : '*'
    const OVACESinaiseSintomas = req.body.OVACESinaiseSintomas ? req.body.OVACESinaiseSintomas : '*'
    const ParadaSinaiseSintomas = `${req.body.ParadaSinaiseSintomas ? req.body.ParadaSinaiseSintomas : '*'} ${req.body.CardiacaSinaiseSintomas ? req.body.CardiacaSinaiseSintomas : '*'} ${req.body.RespiratoriaSinaiseSintomas ? req.body.RespiratoriaSinaiseSintomas : '*'}`
    const PriaprismoSinaiseSintomas = req.body.PriaprismoSinaiseSintomas ? req.body.PriaprismoSinaiseSintomas : '*'
    const PruridoSinaiseSintomas = req.body.PruridoSinaiseSintomas ? req.body.PruridoSinaiseSintomas : '*'
    const PupilasSinaiseSintomas = `${req.body.PupilasSinaiseSintomas ? req.body.PupilasSinaiseSintomas : '*'} ${req.body.AnisocoriaSinaiseSintomas ? req.body.AnisocoriaSinaiseSintomas : '*'} ${req.body.MioseSinaiseSintomas ? req.body.MioseSinaiseSintomas : '*'} ${req.body.IsocoriaSinaiseSintomas ? req.body.IsocoriaSinaiseSintomas : '*'} ${req.body.MidriaseSinaiseSintomas ? req.body.MidriaseSinaiseSintomas : '*'} ${req.body.ReagenteSinaiseSintomas ? req.body.ReagenteSinaiseSintomas : '*'} ${req.body.NaoReagenteSinaiseSintomas ? req.body.NaoReagenteSinaiseSintomas : '*'}`
    const SudoreseSinaiseSintomas = req.body.SudoreseSinaiseSintomas ? req.body.SudoreseSinaiseSintomas : '*'
    const TaquipneiaSinaiseSintomas = req.body.TaquipneiaSinaiseSintomas ? req.body.TaquipneiaSinaiseSintomas : '*'
    const TaquicardiaSinaiseSintomas = req.body.TaquicardiaSinaiseSintomas ? req.body.TaquicardiaSinaiseSintomas : '*'
    var OutroSinaiseSintomas = '*'
    if (req.body.OutroSinaiseSintomas === 'on' && req.body.ValorOutroSinaiseSintomas.length > 0) {
        OutroSinaiseSintomas = req.body.ValorOutroSinaiseSintomas
    }
    var SinaiseSintomas = ''
    if (AbdomenSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + AbdomenSinaiseSintomas
    }
    if (AfundamentoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + ', ' + AfundamentoSinaiseSintomas
    }
    if (AgitacaoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + ', ' + AgitacaoSinaiseSintomas
    }
    if (AmnesiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + AmnesiaSinaiseSintomas
    }
    if (AnginaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + AnginaSinaiseSintomas
    }
    if (ApineiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + ApineiaSinaiseSintomas
    }
    if (BradicardiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + BradicardiaSinaiseSintomas
    }
    if (BradipneiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + BradipneiaSinaiseSintomas
    }
    if (BroncoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + BroncoSinaiseSintomas
    }
    if (CefaleiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + CefaleiaSinaiseSintomas
    }
    if (CianoseSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + CianoseSinaiseSintomas
    }
    if (ConvulsaoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + ConvulsaoSinaiseSintomas
    }
    if (DecorticacaoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DecorticacaoSinaiseSintomas
    }
    if (DeformidadeSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DeformidadeSinaiseSintomas
    }
    if (DescerebracaoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DescerebracaoSinaiseSintomas
    }
    if (DesmaioSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DesmaioSinaiseSintomas
    }
    if (DesvioSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DesvioSinaiseSintomas
    }
    if (DispneiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DispneiaSinaiseSintomas
    }
    if (DorSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + DorSinaiseSintomas
    }
    if (EdemaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + EdemaSinaiseSintomas
    }
    if (EstaseSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + EstaseSinaiseSintomas
    }
    if (FaceSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + FaceSinaiseSintomas
    }
    if (HemorragiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + HemorragiaSinaiseSintomas
    }
    if (HipertensaoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + HipertensaoSinaiseSintomas
    }
    if (HipotensaoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + HipotensaoSinaiseSintomas
    }
    if (NauseasSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + NauseasSinaiseSintomas
    }
    if (NasoragiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + NasoragiaSinaiseSintomas
    }
    if (IsocoriaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + IsocoriaSinaiseSintomas
    }
    if (ObitoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + ObitoSinaiseSintomas
    }
    if (OtorreiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + OtorreiaSinaiseSintomas
    }
    if (OtorragiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + OtorragiaSinaiseSintomas
    }
    if (OVACESinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + OVACESinaiseSintomas
    }
    if (ParadaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + ParadaSinaiseSintomas
    }
    if (PriaprismoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + PriaprismoSinaiseSintomas
    }
    if (PruridoSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + PruridoSinaiseSintomas
    }
    if (PupilasSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + PupilasSinaiseSintomas
    }
    if (SudoreseSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + SudoreseSinaiseSintomas
    }
    if (TaquipneiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + TaquipneiaSinaiseSintomas
    }
    if (TaquicardiaSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + TaquicardiaSinaiseSintomas
    }
    if (OutroSinaiseSintomas.length > 1) {
        SinaiseSintomas = SinaiseSintomas + '' + OutroSinaiseSintomas
    }
    //Accordion Avaliação Paciente
    const AberturaOcularMenor = req.body.AberturaOcularMenor ? req.body.AberturaOcularMenor : '*'
    const RespostaVerbalMenor = req.body.RespostaVerbalMenor ? req.body.RespostaVerbalMenor : '*'
    const RespostaMotoraMenor = req.body.RespostaMotoraMenor ? req.body.RespostaMotoraMenor : '*'
    const TotalGCSMenor = req.body.TotalGCSMenor ? req.body.TotalGCSMenor : '*'
    const AberturaOcularMaior = req.body.AberturaOcularMaior ? req.body.AberturaOcularMaior : '*'
    const RespostaVerbalMaior = req.body.RespostaVerbalMaior ? req.body.RespostaVerbalMaior : '*'
    const RespostaMotoraMaior = req.body.RespostaMotoraMaior ? req.body.RespostaMotoraMaior : '*'
    const TotalGCSMaior = req.body.TotalGCSMaior ? req.body.TotalGCSMaior : '*'
    //Accordion Sinais Vitais
    const PressaoSinaisVitais = req.body.PressaoSinaisVitais ? req.body.PressaoSinaisVitais : '*'
    const ArterialSinaisVitais = req.body.ArterialSinaisVitais ? req.body.ArterialSinaisVitais : '*'
    const PulsoSinaisVitais = req.body.PulsoSinaisVitais ? req.body.PulsoSinaisVitais : '*'
    const RespiracaoSinaisVitais = req.body.RespiracaoSinaisVitais ? req.body.RespiracaoSinaisVitais : '*'
    const SaturacaoSinaisVitais = req.body.SaturacaoSinaisVitais ? req.body.SaturacaoSinaisVitais : '*'
    const HGTSinaisVitais = req.body.HGTSinaisVitais ? req.body.HGTSinaisVitais : '*'
    const TemperaturaSinaisVitais = req.body.TemperaturaSinaisVitais ? req.body.TemperaturaSinaisVitais : '*'
    const PerfusaoSinaisVitais = req.body.PerfusaoSinaisVitais ? req.body.PerfusaoSinaisVitais : '*'
    const SituacaoSinaisVitais = req.body.SituacaoSinaisVitais ? req.body.SituacaoSinaisVitais : '*'
    //Accordion Forma de condução / Vitima era / Objetos Recolhidos
    const FormaConducao = req.body.FormaConducao ? req.body.FormaConducao : '*'
    const VitimaEra = req.body.VitimaEra ? req.body.VitimaEra : '*'
    const ObjetosRecolhidos = req.body.ObjetosRecolhidos ? req.body.ObjetosRecolhidos : '*'
    //Accordion Decisão Transporte / Equipe de Atendimento
    const DecisaoTransporte = req.body.DecisaoTransporte ? req.body.DecisaoTransporte : '*'
    const MEquipeAtendimento = req.body.MEquipeAtendimento ? req.body.MEquipeAtendimento : '*'
    const S1EquipeAtendimento = req.body.S1EquipeAtendimento ? req.body.S1EquipeAtendimento : '*'
    const S2EquipeAtendimento = req.body.S2EquipeAtendimento ? req.body.S2EquipeAtendimento : '*'
    const S3EquipeAtendimento = req.body.S3EquipeAtendimento ? req.body.S3EquipeAtendimento : '*'
    const EquipeEquipeAtendimento = req.body.EquipeEquipeAtendimento ? req.body.EquipeEquipeAtendimento : '*'
    const DemandanteEquipeAtendimento = req.body.DemandanteEquipeAtendimento ? req.body.DemandanteEquipeAtendimento : '*'
    //Accordion Procedimentos Efetuados
    const AspiracaoProcedimentosEfetuados = req.body.AspiracaoProcedimentosEfetuados ? req.body.AspiracaoProcedimentosEfetuados : '*'
    const AvaliacaoInicialProcedimentosEfetuados = req.body.AvaliacaoInicialProcedimentosEfetuados ? req.body.AvaliacaoInicialProcedimentosEfetuados : '*'
    const AvaliacaoDirigidaProcedimentosEfetuados = req.body.AvaliacaoDirigidaProcedimentosEfetuados ? req.body.AvaliacaoDirigidaProcedimentosEfetuados : '*'
    const AvaliacaoContinuadaProcedimentosEfetuados = req.body.AvaliacaoContinuadaProcedimentosEfetuados ? req.body.AvaliacaoContinuadaProcedimentosEfetuados : '*'
    const ChaveProcedimentosEfetuados = req.body.ChaveProcedimentosEfetuados ? req.body.ChaveProcedimentosEfetuados : '*'
    const CanulaProcedimentosEfetuados = req.body.CanulaProcedimentosEfetuados ? req.body.CanulaProcedimentosEfetuados : '*'
    const DesobstrucaoProcedimentosEfetuados = req.body.DesobstrucaoProcedimentosEfetuados ? req.body.DesobstrucaoProcedimentosEfetuados : '*'
    const EmpregoProcedimentosEfetuados = req.body.EmpregoProcedimentosEfetuados ? req.body.EmpregoProcedimentosEfetuados : '*'
    const GerenciamentoProcedimentosEfetuados = req.body.GerenciamentoProcedimentosEfetuados ? req.body.GerenciamentoProcedimentosEfetuados : '*'
    const LimpezaProcedimentosEfetuados = req.body.LimpezaProcedimentosEfetuados ? req.body.LimpezaProcedimentosEfetuados : '*'
    const CurativosProcedimentosEfetuados = req.body.CurativosProcedimentosEfetuados ? req.body.CurativosProcedimentosEfetuados : '*'
    const CompressivoProcedimentosEfetuados = req.body.CompressivoProcedimentosEfetuados ? req.body.CompressivoProcedimentosEfetuados : '*'
    const EncravamentoProcedimentosEfetuados = req.body.EncravamentoProcedimentosEfetuados ? req.body.EncravamentoProcedimentosEfetuados : '*'
    const OcularProcedimentosEfetuados = req.body.OcularProcedimentosEfetuados ? req.body.OcularProcedimentosEfetuados : '*'
    const QueimaduraProcedimentosEfetuados = req.body.QueimaduraProcedimentosEfetuados ? req.body.QueimaduraProcedimentosEfetuados : '*'
    const SimplesProcedimentosEfetuados = req.body.SimplesProcedimentosEfetuados ? req.body.SimplesProcedimentosEfetuados : '*'
    const _3PontasProcedimentosEfetuados = req.body._3PontasProcedimentosEfetuados ? req.body._3PontasProcedimentosEfetuados : '*'
    const ImobilizacoesProcedimentosEfetuados = req.body.ImobilizacoesProcedimentosEfetuados ? req.body.ImobilizacoesProcedimentosEfetuados : '*'
    const InferiorDireitoProcedimentosEfetuados = req.body.InferiorDireitoProcedimentosEfetuados ? req.body.InferiorDireitoProcedimentosEfetuados : '*'
    const InferiorEsquerdoProcedimentosEfetuados = req.body.InferiorEsquerdoProcedimentosEfetuados ? req.body.InferiorEsquerdoProcedimentosEfetuados : '*'
    const SuperiorDireitoProcedimentosEfetuados = req.body.SuperiorDireitoProcedimentosEfetuados ? req.body.SuperiorDireitoProcedimentosEfetuados : '*'
    const SuperiorEsquerdoProcedimentosEfetuados = req.body.SuperiorEsquerdoProcedimentosEfetuados ? req.body.SuperiorEsquerdoProcedimentosEfetuados : '*'
    const QuadrilProcedimentosEfetuados = req.body.QuadrilProcedimentosEfetuados ? req.body.QuadrilProcedimentosEfetuados : '*'
    const CervicalProcedimentosEfetuados = req.body.CervicalProcedimentosEfetuados ? req.body.CervicalProcedimentosEfetuados : '*'
    const MacaRodasProcedimentosEfetuados = req.body.MacaRodasProcedimentosEfetuados ? req.body.MacaRodasProcedimentosEfetuados : '*'
    const MacaRigidaProcedimentosEfetuados = req.body.MacaRigidaProcedimentosEfetuados ? req.body.MacaRigidaProcedimentosEfetuados : '*'
    const PonteProcedimentosEfetuados = req.body.PonteProcedimentosEfetuados ? req.body.PonteProcedimentosEfetuados : '*'
    const RetiradoProcedimentosEfetuados = req.body.RetiradoProcedimentosEfetuados ? req.body.RetiradoProcedimentosEfetuados : '*'
    const RCPProcedimentosEfetuados = req.body.RCPProcedimentosEfetuados ? req.body.RCPProcedimentosEfetuados : '*'
    const _90ProcedimentosEfetuados = req.body._90ProcedimentosEfetuados ? req.body._90ProcedimentosEfetuados : '*'
    const _180ProcedimentosEfetuados = req.body._180ProcedimentosEfetuados ? req.body._180ProcedimentosEfetuados : '*'
    const TomadaProcedimentosEfetuados = req.body.TomadaProcedimentosEfetuados ? req.body.TomadaProcedimentosEfetuados : '*'
    const TratadoProcedimentosEfetuados = req.body.TratadoProcedimentosEfetuados ? req.body.TratadoProcedimentosEfetuados : '*'
    const UsoProcedimentosEfetuados = req.body.UsoProcedimentosEfetuados ? req.body.UsoProcedimentosEfetuados : '*'
    const ColarProcedimentosEfetuados = req.body.ColarProcedimentosEfetuados ? req.body.ColarProcedimentosEfetuados : '*'
    const TTFProcedimentosEfetuados = req.body.TTFProcedimentosEfetuados ? req.body.TTFProcedimentosEfetuados : '*'
    const VentilacaoProcedimentosEfetuados = req.body.VentilacaoProcedimentosEfetuados ? req.body.VentilacaoProcedimentosEfetuados : '*'
    const OxigenioterapiaProcedimentosEfetuados = req.body.OxigenioterapiaProcedimentosEfetuados ? req.body.OxigenioterapiaProcedimentosEfetuados : '*'
    const ReanimadorProcedimentosEfetuados = req.body.ReanimadorProcedimentosEfetuados ? req.body.ReanimadorProcedimentosEfetuados : '*'
    const MeiosProcedimentosEfetuados = req.body.MeiosProcedimentosEfetuados ? req.body.MeiosProcedimentosEfetuados : '*'
    const CelescProcedimentosEfetuados = req.body.CelescProcedimentosEfetuados ? req.body.CelescProcedimentosEfetuados : '*'
    const PoliciaProcedimentosEfetuados = req.body.PoliciaProcedimentosEfetuados ? req.body.PoliciaProcedimentosEfetuados : '*'
    const DefCivilProcedimentosEfetuados = req.body.DefCivilProcedimentosEfetuados ? req.body.DefCivilProcedimentosEfetuados : '*'
    const IGPPCProcedimentosEfetuados = req.body.IGPPCProcedimentosEfetuados ? req.body.IGPPCProcedimentosEfetuados : '*'
    const SamuProcedimentosEfetuados = req.body.SamuProcedimentosEfetuados ? req.body.SamuProcedimentosEfetuados : '*'
    const CITProcedimentosEfetuados = req.body.CITProcedimentosEfetuados ? req.body.CITProcedimentosEfetuados : '*'
    const OutroProcedimentosEfetuados = req.body.OutroProcedimentosEfetuados ? req.body.OutroProcedimentosEfetuados : '*'
    var ProcedimentosEfetuados = '*'
    if (AspiracaoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + AspiracaoProcedimentosEfetuados
    }
    if (AvaliacaoInicialProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + ', ' + AvaliacaoInicialProcedimentosEfetuados
    }
    if (AvaliacaoDirigidaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + ', ' + AvaliacaoDirigidaProcedimentosEfetuados
    }
    if (AvaliacaoContinuadaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + AvaliacaoContinuadaProcedimentosEfetuados
    }
    if (ChaveProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + ChaveProcedimentosEfetuados
    }
    if (CanulaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + CanulaProcedimentosEfetuados
    }
    if (DesobstrucaoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + DesobstrucaoProcedimentosEfetuados
    }
    if (EmpregoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + EmpregoProcedimentosEfetuados
    }
    if (GerenciamentoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + GerenciamentoProcedimentosEfetuados
    }
    if (LimpezaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + LimpezaProcedimentosEfetuados
    }
    if (CurativosProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + CurativosProcedimentosEfetuados
    }
    if (CompressivoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + CompressivoProcedimentosEfetuados
    }
    if (EncravamentoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + EncravamentoProcedimentosEfetuados
    }
    if (OcularProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + OcularProcedimentosEfetuados
    }
    if (QueimaduraProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + QueimaduraProcedimentosEfetuados
    }
    if (SimplesProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + SimplesProcedimentosEfetuados
    }
    if (_3PontasProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + _3PontasProcedimentosEfetuados
    }
    if (ImobilizacoesProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + ImobilizacoesProcedimentosEfetuados
    }
    if (InferiorDireitoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + InferiorDireitoProcedimentosEfetuados
    }
    if (InferiorEsquerdoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + InferiorEsquerdoProcedimentosEfetuados
    }
    if (SuperiorDireitoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + SuperiorDireitoProcedimentosEfetuados
    }
    if (SuperiorEsquerdoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + SuperiorEsquerdoProcedimentosEfetuados
    }
    if (QuadrilProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + QuadrilProcedimentosEfetuados
    }
    if (CervicalProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + CervicalProcedimentosEfetuados
    }
    if (MacaRodasProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + MacaRodasProcedimentosEfetuados
    }
    if (MacaRigidaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + MacaRigidaProcedimentosEfetuados
    }
    if (PonteProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + PonteProcedimentosEfetuados
    }
    if (RetiradoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + RetiradoProcedimentosEfetuados
    }
    if (RCPProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + RCPProcedimentosEfetuados
    }
    if (_90ProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + _90ProcedimentosEfetuados
    }
    if (_180ProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + _180ProcedimentosEfetuados
    }
    if (TomadaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + TomadaProcedimentosEfetuados
    }
    if (TratadoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + TratadoProcedimentosEfetuados
    }
    if (UsoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + UsoProcedimentosEfetuados
    }
    if (ColarProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + ColarProcedimentosEfetuados
    }
    if (TTFProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + TTFProcedimentosEfetuados
    }
    if (VentilacaoProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + VentilacaoProcedimentosEfetuados
    }
    if (OxigenioterapiaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + OxigenioterapiaProcedimentosEfetuados
    }
    if (ReanimadorProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + ReanimadorProcedimentosEfetuados
    }
    if (MeiosProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + MeiosProcedimentosEfetuados
    }
    if (CelescProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + CelescProcedimentosEfetuados
    }
    if (PoliciaProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + PoliciaProcedimentosEfetuados
    }
    if (DefCivilProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + DefCivilProcedimentosEfetuados
    }
    if (IGPPCProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + IGPPCProcedimentosEfetuados
    }
    if (SamuProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + SamuProcedimentosEfetuados
    }
    if (CITProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + CITProcedimentosEfetuados
    }
    if (OutroProcedimentosEfetuados.length > 1) {
        ProcedimentosEfetuados = ProcedimentosEfetuados + '' + OutroProcedimentosEfetuados
    }
    //Accordion Anamnese Emergência Médica / Gestacional
    //Medica
    const OqueMedica = req.body.OqueMedica ? req.body.OqueMedica : '*'
    const OutrasVezesMedica = req.body.OutrasVezesMedica ? req.body.OutrasVezesMedica : '*'
    const QuantoTempoMedica = req.body.QuantoTempoMedica ? req.body.QuantoTempoMedica : '*'
    const ProblemaMedica = req.body.ProblemaMedica ? req.body.ProblemaMedica : '*'
    const QualProblemaMedica = req.body.QualProblemaMedica ? req.body.QualProblemaMedica : '*'
    const MedicacaoMedica = req.body.MedicacaoMedica ? req.body.MedicacaoMedica : '*'
    const HorarioMedicacaoMedica = req.body.HorarioMedicacaoMedica ? req.body.HorarioMedicacaoMedica : '*'
    const QualMedicacaoMedica = req.body.QualMedicacaoMedica ? req.body.QualMedicacaoMedica : '*'
    const AlergicoMedica = req.body.AlergicoMedica ? req.body.AlergicoMedica : '*'
    const QualAlergicoMedica = req.body.QualAlergicoMedica ? req.body.QualAlergicoMedica : '*'
    const IngeriuMedica = req.body.IngeriuMedica ? req.body.IngeriuMedica : '*'
    const HorarioIngeriuMedica = req.body.HorarioIngeriuMedica ? req.body.HorarioIngeriuMedica : '*'
    //Gestacional
    const PreNatal = req.body.PreNatal ? req.body.PreNatal : '*'
    const PeriodoGestacional = req.body.PeriodoGestacional ? req.body.PeriodoGestacional : '*'
    const NomeMedicoGestacional = req.body.NomeMedicoGestacional ? req.body.NomeMedicoGestacional : '*'
    const PossibilidadeGestacional = req.body.PossibilidadeGestacional ? req.body.PossibilidadeGestacional : '*'
    const PrimeiroGestacional = req.body.PrimeiroGestacional ? req.body.PrimeiroGestacional : '*'
    const QuantosGestacional = req.body.QuantosGestacional ? req.body.QuantosGestacional : '*'
    const HorarioContracaoGestacional = req.body.HorarioContracaoGestacional ? req.body.HorarioContracaoGestacional : '*'
    const DuracaoContracaoGestacional = req.body.DuracaoContracaoGestacional ? req.body.DuracaoContracaoGestacional : '*'
    const IntervaloContracaoGestacional = req.body.IntervaloContracaoGestacional ? req.body.IntervaloContracaoGestacional : '*'
    const PressaoGestacional = req.body.PressaoGestacional ? req.body.PressaoGestacional : '*'
    const RupturaGestacional = req.body.RupturaGestacional ? req.body.RupturaGestacional : '*'
    const InspecaoGestacional = req.body.InspecaoGestacional ? req.body.InspecaoGestacional : '*'
    const PartoGestacional = req.body.PartoGestacional ? req.body.PartoGestacional : '*'
    const HoraNascimentoGestacional = req.body.HoraNascimentoGestacional ? req.body.HoraNascimentoGestacional : '*'
    const SexoBebe = req.body.SexoBebe ? req.body.SexoBebe : '*'
    const NomeBebe = req.body.NomeBebe ? req.body.NomeBebe : '*'
    //Accordion Materiais Utilizados Descartaveis
    const AtaduraDescartavel = req.body.AtaduraDescartavel ? req.body.AtaduraDescartavel : '*'
    const TamAtaduraDescartavel = req.body.TamAtaduraDescartavel ? req.body.TamAtaduraDescartavel : '*'
    const QuantAtaduraDescartavel = req.body.QuantAtaduraDescartavel ? req.body.QuantAtaduraDescartavel : '*'
    const CateterDescartavel = req.body.CateterDescartavel ? req.body.CateterDescartavel : '*'
    const QuantCateterDescartavel = req.body.QuantCateterDescartavel ? req.body.QuantCateterDescartavel : '*'
    const CompressaDescartavel = req.body.CompressaDescartavel ? req.body.CompressaDescartavel : '*'
    const QuantCompressaDescartavel = req.body.QuantCompressaDescartavel ? req.body.QuantCompressaDescartavel : '*'
    const KitDescartavel = req.body.KitDescartavel ? req.body.KitDescartavel : '*'
    const TamKitDescartavel = req.body.TamKitDescartavel ? req.body.TamKitDescartavel : '*'
    const QuantKitDescartavel = req.body.QuantKitDescartavel ? req.body.QuantKitDescartavel : '*'
    const LuvasDescartavel = req.body.LuvasDescartavel ? req.body.LuvasDescartavel : '*'
    const QuantLuvasDescartavel = req.body.QuantLuvasDescartavel ? req.body.QuantLuvasDescartavel : '*'
    const MascaraDescartavel = req.body.MascaraDescartavel ? req.body.MascaraDescartavel : '*'
    const QuantMascaraDescartavel = req.body.QuantMascaraDescartavel ? req.body.QuantMascaraDescartavel : '*'
    const MantaDescartavel = req.body.MantaDescartavel ? req.body.MantaDescartavel : '*'
    const QuantMantaDescartavel = req.body.QuantMantaDescartavel ? req.body.QuantMantaDescartavel : '*'
    const PasDescartavel = req.body.PasDescartavel ? req.body.PasDescartavel : '*'
    const QuantPasDescartavel = req.body.QuantPasDescartavel ? req.body.QuantPasDescartavel : '*'
    const SondaDescartavel = req.body.SondaDescartavel ? req.body.SondaDescartavel : '*'
    const QuantSondaDescartavel = req.body.QuantSondaDescartavel ? req.body.QuantSondaDescartavel : '*'
    const SoroDescartavel = req.body.SoroDescartavel ? req.body.SoroDescartavel : '*'
    const QuantSoroDescartavel = req.body.QuantSoroDescartavel ? req.body.QuantSoroDescartavel : '*'
    const TalasDescartavel = req.body.TalasDescartavel ? req.body.TalasDescartavel : '*'
    const TamTalasDescartavel = req.body.TamTalasDescartavel ? req.body.TamTalasDescartavel : '*'
    const QuantTalasDescartavel = req.body.QuantTalasDescartavel ? req.body.QuantTalasDescartavel : '*'
    var OutroDescartavel = '*'
    if (req.body.OutroDescartavel === 'on') {
        OutroDescartavel = req.body.ValorOutroDescartavel
    }
    const QuantOutroDescartavel = req.body.QuantOutroDescartavel ? req.body.QuantOutroDescartavel : '*'
    //Accordion Materiais utilizados deixados no Hospital
    const SondaHospital = req.body.SondaHospital ? req.body.SondaHospital : '*'
    const QuantSondaHospital = req.body.QuantSondaHospital ? req.body.QuantSondaHospital : '*'
    const ColarHospital = req.body.ColarHospital ? req.body.ColarHospital : '*'
    const TamColarHospital = req.body.TamColarHospital || req.body.OutroTamColarHospital ? req.body.TamColarHospital + req.body.OutroTamColarHospital : '*'
    const QuantColarHospital = req.body.QuantColarHospital ? req.body.QuantColarHospital : '*'
    const CoxinsHospital = req.body.CoxinsHospital ? req.body.CoxinsHospital : '*'
    const QuantCoxinsHospital = req.body.QuantCoxinsHospital ? req.body.QuantCoxinsHospital : '*'
    const MacaHospital = req.body.MacaHospital ? req.body.MacaHospital : '*'
    const QuantMacaHospital = req.body.QuantMacaHospital ? req.body.QuantMacaHospital : '*'
    const TTFHospital = req.body.TTFHospital ? req.body.TTFHospital : '*'
    const TamTTFHospital = req.body.TamTTFHospital ? req.body.TamTTFHospital : '*'
    const QuantTTFHospital = req.body.QuantTTFHospital ? req.body.QuantTTFHospital : '*'
    const TiranteAranhaHospital = req.body.TiranteAranhaHospital ? req.body.TiranteAranhaHospital : '*'
    const QuantTiranteAranhaHospital = req.body.QuantTiranteAranhaHospital ? req.body.QuantTiranteAranhaHospital : '*'
    const TiranteCabecaHospital = req.body.TiranteCabecaHospital ? req.body.TiranteCabecaHospital : '*'
    const QuantTiranteCabecaHospital = req.body.QuantTiranteCabecaHospital ? req.body.QuantTiranteCabecaHospital : '*'
    const CanulaHospital = req.body.CanulaHospital ? req.body.CanulaHospital : '*'
    const QuantCanulaHospital = req.body.QuantCanulaHospital ? req.body.QuantCanulaHospital : '*'
    var OutroHospital = '*'
    if (req.body.OutroHospital === 'on') {
        OutroHospital = req.body.ValorOutroHospital
    }
    const QuantOutroHospital = req.body.QuantOutroHospital ? req.body.QuantOutroHospital : '*'
    //Accordion Avaliação Cinemática
    const DisturbioAvaliacaoCinematica = req.body.DisturbioAvaliacaoCinematica ? req.body.DisturbioAvaliacaoCinematica : '*'
    const EncontradoCapaceteAvaliacaoCinematica = req.body.EncontradoCapaceteAvaliacaoCinematica ? req.body.EncontradoCapaceteAvaliacaoCinematica : '*'
    const EncontradoCintoAvaliacaoCinematica = req.body.EncontradoCintoAvaliacaoCinematica ? req.body.EncontradoCintoAvaliacaoCinematica : '*'
    const ParaBrisasAvariadoAvaliacaoCinematica = req.body.ParaBrisasAvariadoAvaliacaoCinematica ? req.body.ParaBrisasAvariadoAvaliacaoCinematica : '*'
    const CaminhandoAvaliacaoCinematica = req.body.CaminhandoAvaliacaoCinematica ? req.body.CaminhandoAvaliacaoCinematica : '*'
    const PainelAvariadoAvaliacaoCinematica = req.body.PainelAvariadoAvaliacaoCinematica ? req.body.PainelAvariadoAvaliacaoCinematica : '*'
    const VolanteRetorcidoAvaliacaoCinematica = req.body.VolanteRetorcidoAvaliacaoCinematica ? req.body.VolanteRetorcidoAvaliacaoCinematica : '*'
    //Accordion Termo de Recusa de Atendimento E/OU Transporte
    const ObsImportantes = req.body.ObsImportantes ? req.body.ObsImportantes : '*'

    const sql = "INSERT INTO ocorrencia (DataDadosPaciente,SexoDadosPaciente,NomeHospitalDadosPaciente,NomePacienteDadosPaciente,CpfDadosPaciente,RgDadosPaciente,FonePacienteDadosPaciente,IdadePacienteDadosPaciente,NomeAcompanhanteDadosPaciente,IdadeAcompanhanteDadosPaciente,LocalOcorrenciaDadosPaciente,NumeroUsbDadosOcorrencia,DespDadosOcorrencia,HCHDadosOcorrencia,KmFinalDadosOcorrencia,CodDadosOcorrencia,CodSiaSusDadosOcorrencia,TipoOcorrencia,PsiquiatricoProblemasSuspeitos,RespiratorioProblemasSuspeitos,DiabetesProblemasSuspeitos,ObstetricoProblemasSuspeitos,TransporteProblemasSuspeitos,OutroProblemaProblemaSuspeitos,SinaiseSintomas,AberturaOcularMenor,RespostaVerbalMenor,RespostaMotoraMenor,TotalGCSMenor,AberturaOcularMaior,RespostaVerbalMaior,RespostaMotoraMaior,TotalGCSMaior,PressaoSinaisVitais,ArterialSinaisVitais,PulsoSinaisVitais,RespiracaoSinaisVitais,SaturacaoSinaisVitais,HGTSinaisVitais,TemperaturaSinaisVitais,PerfusaoSinaisVitais,SituacaoSinaisVitais,FormaConducao,VitimaEra,ObjetosRecolhidos,DecisaoTransporte,MEquipeAtendimento,S1EquipeAtendimento,S2EquipeAtendimento,S3EquipeAtendimento,EquipeEquipeAtendimento,DemandanteEquipeAtendimento,DisturbioAvaliacaoCinematica,EncontradoCapaceteAvaliacaoCinematica,EncontradoCintoAvaliacaoCinematica,ParaBrisasAvariadoAvaliacaoCinematica,CaminhandoAvaliacaoCinematica,PainelAvariadoAvaliacaoCinematica,VolanteRetorcidoAvaliacaoCinematica,ProcedimentosEfetuados,OqueMedica,OutrasVezesMedica,QuantoTempoMedica,ProblemaMedica,QualProblemaMedica,MedicacaoMedica,HorarioMedicacaoMedica,QualMedicacaoMedica,AlergicoMedica,QualAlergicoMedica,IngeriuMedica,HorarioIngeriuMedica,PreNatal,PeriodoGestacional,NomeMedicoGestacional,PossibilidadeGestacional,PrimeiroGestacional,QuantosGestacional,HorarioContracaoGestacional,DuracaoContracaoGestacional,IntervaloContracaoGestacional,PressaoGestacional,RupturaGestacional,InspecaoGestacional,PartoGestacional,HoraNascimentoGestacional,SexoBebe,NomeBebe,AtaduraDescartavel,TamAtaduraDescartavel,QuantAtaduraDescartavel,CateterDescartavel,QuantCateterDescartavel,CompressaDescartavel,QuantCompressaDescartavel,KitDescartavel,TamKitDescartavel,QuantKitDescartavel,LuvasDescartavel,QuantLuvasDescartavel,MascaraDescartavel,QuantMascaraDescartavel,MantaDescartavel,QuantMantaDescartavel,PasDescartavel,QuantPasDescartavel,SondaDescartavel,QuantSondaDescartavel,SoroDescartavel,QuantSoroDescartavel,TalasDescartavel,TamTalasDescartavel,QuantTalasDescartavel,OutroDescartavel,QuantOutroDescartavel,SondaHospital,QuantSondaHospital,ColarHospital,TamColarHospital,QuantColarHospital,CoxinsHospital,QuantCoxinsHospital,MacaHospital,QuantMacaHospital,QuantTTFHospital,TTFHospital,TamTTFHospital,TiranteAranhaHospital,QuantTiranteAranhaHospital,TiranteCabecaHospital,QuantTiranteCabecaHospital,CanulaHospital,QuantCanulaHospital,OutroHospital,QuantOutroHospital)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    connection.query(sql, [DataDadosPaciente,
        SexoDadosPaciente,
        NomeHospitalDadosPaciente,
        NomePacienteDadosPaciente,
        CpfDadosPaciente,
        RgDadosPaciente,
        FonePacienteDadosPaciente,
        IdadePacienteDadosPaciente,
        NomeAcompanhanteDadosPaciente,
        IdadeAcompanhanteDadosPaciente,
        LocalOcorrenciaDadosPaciente,
        NumeroUsbDadosOcorrencia,
        DespDadosOcorrencia,
        HCHDadosOcorrencia,
        KmFinalDadosOcorrencia,
        CodDadosOcorrencia,
        CodSiaSusDadosOcorrencia,
        TipoOcorrencia,
        PsiquiatricoProblemasSuspeitos,
        RespiratorioProblemasSuspeitos,
        DiabetesProblemasSuspeitos,
        ObstetricoProblemasSuspeitos,
        TransporteProblemasSuspeitos,
        OutroProblemaProblemasSuspeitos,
        SinaiseSintomas,
        AberturaOcularMenor,
        RespostaVerbalMenor,
        RespostaMotoraMenor,
        TotalGCSMenor,
        AberturaOcularMaior,
        RespostaVerbalMaior,
        RespostaMotoraMaior,
        TotalGCSMaior,
        PressaoSinaisVitais,
        ArterialSinaisVitais,
        PulsoSinaisVitais,
        RespiracaoSinaisVitais,
        SaturacaoSinaisVitais,
        HGTSinaisVitais,
        TemperaturaSinaisVitais,
        PerfusaoSinaisVitais,
        SituacaoSinaisVitais,
        FormaConducao,
        VitimaEra,
        ObjetosRecolhidos,
        DecisaoTransporte,
        MEquipeAtendimento,
        S1EquipeAtendimento,
        S2EquipeAtendimento,
        S3EquipeAtendimento,
        EquipeEquipeAtendimento,
        DemandanteEquipeAtendimento,
        DisturbioAvaliacaoCinematica,
        EncontradoCapaceteAvaliacaoCinematica,
        EncontradoCintoAvaliacaoCinematica,
        ParaBrisasAvariadoAvaliacaoCinematica,
        CaminhandoAvaliacaoCinematica,
        PainelAvariadoAvaliacaoCinematica,
        VolanteRetorcidoAvaliacaoCinematica,
        ProcedimentosEfetuados,
        OqueMedica,
        OutrasVezesMedica,
        QuantoTempoMedica,
        ProblemaMedica,
        QualProblemaMedica,
        MedicacaoMedica,
        HorarioMedicacaoMedica,
        QualMedicacaoMedica,
        AlergicoMedica,
        QualAlergicoMedica,
        IngeriuMedica,
        HorarioIngeriuMedica,
        PreNatal,
        PeriodoGestacional,
        NomeMedicoGestacional,
        PossibilidadeGestacional,
        PrimeiroGestacional,
        QuantosGestacional,
        HorarioContracaoGestacional,
        DuracaoContracaoGestacional,
        IntervaloContracaoGestacional,
        PressaoGestacional,
        RupturaGestacional,
        InspecaoGestacional,
        PartoGestacional,
        HoraNascimentoGestacional,
        SexoBebe,
        NomeBebe,
        AtaduraDescartavel,
        TamAtaduraDescartavel,
        QuantAtaduraDescartavel,
        CateterDescartavel,
        QuantCateterDescartavel,
        CompressaDescartavel,
        QuantCompressaDescartavel,
        KitDescartavel,
        TamKitDescartavel,
        QuantKitDescartavel,
        LuvasDescartavel,
        QuantLuvasDescartavel,
        MascaraDescartavel,
        QuantMascaraDescartavel,
        MantaDescartavel,
        QuantMantaDescartavel,
        PasDescartavel,
        QuantPasDescartavel,
        SondaDescartavel,
        QuantSondaDescartavel,
        SoroDescartavel,
        QuantSoroDescartavel,
        TalasDescartavel,
        TamTalasDescartavel,
        QuantTalasDescartavel,
        OutroDescartavel,
        QuantOutroDescartavel,
        SondaHospital,
        QuantSondaHospital,
        ColarHospital,
        TamColarHospital,
        QuantColarHospital,
        CoxinsHospital,
        QuantCoxinsHospital,
        MacaHospital,
        QuantMacaHospital,
        QuantTTFHospital,
        TTFHospital,
        TamTTFHospital,
        TiranteAranhaHospital,
        QuantTiranteAranhaHospital,
        TiranteCabecaHospital,
        QuantTiranteCabecaHospital,
        CanulaHospital,
        QuantCanulaHospital,
        OutroHospital,
        QuantOutroHospital], function (err, result) {
            if (!err) {
                console.log("Ocorrência criada com sucesso!");
                res.render('historico');
            } else {
                console.log("Erro ao inserir no banco de dados:", err);
                res.status(500).send("Erro ao cadastrar usuário");
            }
        });


    res.render('ocorrencia')
})


app.listen(port, () => {
    console.log(`Servidor Rodando na porta ${port}`)
})