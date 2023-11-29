-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Nov-2023 às 05:09
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `noar2`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `ocorrencia`
--

CREATE TABLE `ocorrencia` (
  `id_ocorrencia` int(11) NOT NULL,
  `DataDadosPaciente` varchar(100) NOT NULL,
  `SexoDadosPaciente` varchar(100) NOT NULL,
  `NomeHospitalDadosPaciente` varchar(100) NOT NULL,
  `NomePacienteDadosPaciente` varchar(100) NOT NULL,
  `CpfDadosPaciente` varchar(100) NOT NULL,
  `RgDadosPaciente` varchar(100) NOT NULL,
  `FonePacienteDadosPaciente` varchar(100) NOT NULL,
  `IdadePacienteDadosPaciente` varchar(100) NOT NULL,
  `NomeAcompanhanteDadosPaciente` varchar(100) NOT NULL,
  `IdadeAcompanhanteDadosPaciente` varchar(100) NOT NULL,
  `LocalOcorrenciaDadosPaciente` varchar(100) NOT NULL,
  `NumeroUsbDadosOcorrencia` varchar(100) NOT NULL,
  `DespDadosOcorrencia` varchar(100) NOT NULL,
  `HCHDadosOcorrencia` varchar(100) NOT NULL,
  `KmFinalDadosOcorrencia` varchar(100) NOT NULL,
  `CodDadosOcorrencia` varchar(100) NOT NULL,
  `CodSiaSusDadosOcorrencia` varchar(100) NOT NULL,
  `TipoOcorrencia` varchar(100) NOT NULL,
  `PsiquiatricoProblemasSuspeitos` varchar(100) NOT NULL,
  `RespiratorioProblemasSuspeitos` varchar(100) NOT NULL,
  `DiabetesProblemasSuspeitos` varchar(100) NOT NULL,
  `ObstetricoProblemasSuspeitos` varchar(100) NOT NULL,
  `TransporteProblemasSuspeitos` varchar(100) NOT NULL,
  `OutroProblemaProblemaSuspeitos` varchar(100) NOT NULL,
  `SinaiseSintomas` varchar(100) NOT NULL,
  `AberturaOcularMenor` varchar(100) NOT NULL,
  `RespostaVerbalMenor` varchar(100) NOT NULL,
  `RespostaMotoraMenor` varchar(100) NOT NULL,
  `TotalGCSMenor` varchar(100) NOT NULL,
  `AberturaOcularMaior` varchar(100) NOT NULL,
  `RespostaVerbalMaior` varchar(100) NOT NULL,
  `RespostaMotoraMaior` varchar(100) NOT NULL,
  `TotalGCSMaior` varchar(100) NOT NULL,
  `PressaoSinaisVitais` varchar(100) NOT NULL,
  `ArterialSinaisVitais` varchar(100) NOT NULL,
  `PulsoSinaisVitais` varchar(100) NOT NULL,
  `RespiracaoSinaisVitais` varchar(100) NOT NULL,
  `SaturacaoSinaisVitais` varchar(100) NOT NULL,
  `HGTSinaisVitais` varchar(100) NOT NULL,
  `TemperaturaSinaisVitais` varchar(100) NOT NULL,
  `PerfusaoSinaisVitais` varchar(100) NOT NULL,
  `SituacaoSinaisVitais` varchar(100) NOT NULL,
  `FormaConducao` varchar(100) NOT NULL,
  `VitimaEra` varchar(100) NOT NULL,
  `ObjetosRecolhidos` varchar(100) NOT NULL,
  `DecisaoTransporte` varchar(100) NOT NULL,
  `MEquipeAtendimento` varchar(100) NOT NULL,
  `S1EquipeAtendimento` varchar(100) NOT NULL,
  `S2EquipeAtendimento` varchar(100) NOT NULL,
  `S3EquipeAtendimento` varchar(100) NOT NULL,
  `EquipeEquipeAtendimento` varchar(100) NOT NULL,
  `DemandanteEquipeAtendimento` varchar(100) NOT NULL,
  `DisturbioAvaliacaoCinematica` varchar(100) NOT NULL,
  `EncontradoCapaceteAvaliacaoCinematica` varchar(100) NOT NULL,
  `EncontradoCintoAvaliacaoCinematica` varchar(100) NOT NULL,
  `ParaBrisasAvariadoAvaliacaoCinematica` varchar(100) NOT NULL,
  `CaminhandoAvaliacaoCinematica` varchar(100) NOT NULL,
  `PainelAvariadoAvaliacaoCinematica` varchar(100) NOT NULL,
  `VolanteRetorcidoAvaliacaoCinematica` varchar(100) NOT NULL,
  `ProcedimentosEfetuados` varchar(100) NOT NULL,
  `OqueMedica` varchar(100) NOT NULL,
  `OutrasVezesMedica` varchar(100) NOT NULL,
  `QuantoTempoMedica` varchar(100) NOT NULL,
  `ProblemaMedica` varchar(100) NOT NULL,
  `QualProblemaMedica` varchar(100) NOT NULL,
  `MedicacaoMedica` varchar(100) NOT NULL,
  `HorarioMedicacaoMedica` varchar(100) NOT NULL,
  `QualMedicacaoMedica` varchar(100) NOT NULL,
  `AlergicoMedica` varchar(100) NOT NULL,
  `QualAlergicoMedica` varchar(100) NOT NULL,
  `IngeriuMedica` varchar(100) NOT NULL,
  `HorarioIngeriuMedica` varchar(100) NOT NULL,
  `PreNatal` varchar(100) NOT NULL,
  `PeriodoGestacional` varchar(100) NOT NULL,
  `NomeMedicoGestacional` varchar(100) NOT NULL,
  `PossibilidadeGestacional` varchar(100) NOT NULL,
  `PrimeiroGestacional` varchar(100) NOT NULL,
  `QuantosGestacional` varchar(100) NOT NULL,
  `HorarioContracaoGestacional` varchar(100) NOT NULL,
  `DuracaoContracaoGestacional` varchar(100) NOT NULL,
  `IntervaloContracaoGestacional` varchar(100) NOT NULL,
  `PressaoGestacional` varchar(100) NOT NULL,
  `RupturaGestacional` varchar(100) NOT NULL,
  `InspecaoGestacional` varchar(100) NOT NULL,
  `PartoGestacional` varchar(100) NOT NULL,
  `HoraNascimentoGestacional` varchar(100) NOT NULL,
  `SexoBebe` varchar(100) NOT NULL,
  `NomeBebe` varchar(100) NOT NULL,
  `AtaduraDescartavel` varchar(100) NOT NULL,
  `TamAtaduraDescartavel` varchar(100) NOT NULL,
  `QuantAtaduraDescartavel` varchar(100) NOT NULL,
  `CateterDescartavel` varchar(100) NOT NULL,
  `QuantCateterDescartavel` varchar(100) NOT NULL,
  `CompressaDescartavel` varchar(100) NOT NULL,
  `QuantCompressaDescartavel` varchar(100) NOT NULL,
  `KitDescartavel` varchar(100) NOT NULL,
  `TamKitDescartavel` varchar(100) NOT NULL,
  `QuantKitDescartavel` varchar(100) NOT NULL,
  `LuvasDescartavel` varchar(100) NOT NULL,
  `QuantLuvasDescartavel` varchar(100) NOT NULL,
  `MascaraDescartavel` varchar(100) NOT NULL,
  `QuantMascaraDescartavel` varchar(100) NOT NULL,
  `MantaDescartavel` varchar(100) NOT NULL,
  `QuantMantaDescartavel` varchar(100) NOT NULL,
  `PasDescartavel` varchar(100) NOT NULL,
  `QuantPasDescartavel` varchar(100) NOT NULL,
  `SondaDescartavel` varchar(100) NOT NULL,
  `QuantSondaDescartavel` varchar(100) NOT NULL,
  `SoroDescartavel` varchar(100) NOT NULL,
  `QuantSoroDescartavel` varchar(100) NOT NULL,
  `TalasDescartavel` varchar(100) NOT NULL,
  `TamTalasDescartavel` varchar(100) NOT NULL,
  `QuantTalasDescartavel` varchar(100) NOT NULL,
  `OutroDescartavel` varchar(100) NOT NULL,
  `QuantOutroDescartavel` varchar(100) NOT NULL,
  `SondaHospital` varchar(100) NOT NULL,
  `QuantSondaHospital` varchar(100) NOT NULL,
  `ColarHospital` varchar(100) NOT NULL,
  `TamColarHospital` varchar(100) NOT NULL,
  `OutroTamColarHospital` varchar(100) NOT NULL,
  `QuantColarHospital` varchar(100) NOT NULL,
  `CoxinsHospital` varchar(100) NOT NULL,
  `QuantCoxinsHospital` varchar(100) NOT NULL,
  `MacaHospital` varchar(100) NOT NULL,
  `QuantMacaHospital` varchar(100) NOT NULL,
  `QuantTTFHospital` varchar(100) NOT NULL,
  `TTFHospital` varchar(100) NOT NULL,
  `TamTTFHospital` varchar(100) NOT NULL,
  `TiranteAranhaHospital` varchar(100) NOT NULL,
  `QuantTiranteAranhaHospital` varchar(100) NOT NULL,
  `TiranteCabecaHospital` varchar(100) NOT NULL,
  `QuantTiranteCabecaHospital` varchar(100) NOT NULL,
  `CanulaHospital` varchar(100) NOT NULL,
  `QuantCanulaHospital` varchar(100) NOT NULL,
  `OutroHospital` varchar(100) NOT NULL,
  `QuantOutroHospital` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(100) NOT NULL,
  `senha_usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome_usuario`, `senha_usuario`) VALUES
(1, 'adm', 'adm'),
(2, 'teste', 'teste');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `ocorrencia`
--
ALTER TABLE `ocorrencia`
  ADD PRIMARY KEY (`id_ocorrencia`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ocorrencia`
--
ALTER TABLE `ocorrencia`
  MODIFY `id_ocorrencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
