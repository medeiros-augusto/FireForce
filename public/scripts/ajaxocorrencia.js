fetch('/getOcorrencia')
    .then(response => response.json())
    .then(ocorrencias => {
        const ocorrenciaDataDiv = document.getElementById('ocorrencia-data');
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
                            <div class="modal fade" id="exampleModal-${ocorrencia.id_ocorrencia}" tabindex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modificar
                                                ${ocorrencia.id_ocorrencia}
                                            </h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <form action="" method="post">
                                            <div class="modal-body">
        
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <input type="submit" class="btn btn-primary" value="Modificar">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        ocorrenciaDataDiv.innerHTML = ocorrenciaList.join('');
    })
    .catch(error => {
        console.error('Erro ao buscar dados do servidor', error);
    });