//---------Gestacional---------

// Função para exibir a Anamnese
function showAnamnese() {
    // Obtém a referência ao elemento da Anamnese
    var divAnamnese = document.getElementById('anamnese');
    // Exibe a Anamnese
    divAnamnese.style.display = 'block';
}

// Função para ocultar a Anamnese
function hideAnamnese() {
    // Obtém a referência ao elemento da Anamnese
    var divAnamnese = document.getElementById('anamnese');
    // Oculta a Anamnese
    divAnamnese.style.display = 'none';
}

// Ocultar a Anamnese inicialmente
hideAnamnese();

//---------Aparecer Gestante---------

// Função para exibir a seção de Gestante
function showGestante() {
    // Obtém a referência ao elemento da seção de Gestante
    var divGestante = document.getElementById('Gestante');
    // Exibe a seção de Gestante
    divGestante.style.display = 'block';
}

// Função para ocultar a seção de Gestante e a Anamnese
function hideGestante() {
    // Obtém a referência ao elemento da seção de Gestante
    var divGestante = document.getElementById('Gestante');
    // Oculta a seção de Gestante
    divGestante.style.display = 'none';
    // Oculta a Anamnese
    hideAnamnese();
}

