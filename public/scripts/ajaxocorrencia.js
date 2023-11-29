// Realiza uma requisição para a rota '/getOcorrencia'
fetch('/getOcorrencia')
    .then(response => response.json())  // Converte a resposta para formato JSON
    .then(ocorrencias => {
        // Obtém a referência para a div onde os dados da ocorrência serão exibidos
        const ocorrenciaDataDiv = document.getElementById('ocorrencia-data');
        
        // Mapeia as ocorrências recebidas e cria um bloco HTML para cada uma
        const ocorrenciaList = ocorrencias.map(ocorrencia => {
            return `
                <div class="col-lg-6">
                    <div class="card mt-3">
                        <div class="card-body">
                            <h5 class="card-title">Ocorrência N°${ocorrencia.id_ocorrencia}</h5>
                            <p class="card-text">
                                Data: ${ocorrencia.DataDadosPaciente} <br>
                                Paciente: ${ocorrencia.NomePacienteDadosPaciente}
                            </p>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal-${ocorrencia.id_ocorrencia}"
                                data-bs-whatever="${ocorrencia.id_ocorrencia}">Visualizar ocorrência
                                ${ocorrencia.id_ocorrencia}</button>
                            <!-- Modal para exibir detalhes e modificar a ocorrência -->
                            <div class="modal fade" id="exampleModal-${ocorrencia.id_ocorrencia}" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ocorrência N°
                                                ${ocorrencia.id_ocorrencia}
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <!-- Formulário para modificar a ocorrência -->
                                            <div class="modal-body">
                                            <span style="cursor: pointer;" value="../logspdf/dadosocorrencia${ocorrencia.id_ocorrencia}.pdf" target="_blank" onclick="openPdf(event)">Abrir PDF</span>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Insere os blocos HTML na div de dados da ocorrência
        ocorrenciaDataDiv.innerHTML = ocorrenciaList.join('');
    })
    .catch(error => {
        // Trata erros caso ocorram durante a requisição
        console.error('Erro ao buscar dados do servidor', error);
    });
