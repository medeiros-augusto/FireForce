//---------Gestacional---------

  // Função para exibir a Anamnese
  function showAnamnese() {
    var divAnamnese = document.getElementById('anamnese');
    divAnamnese.style.display = 'block';
}

// Função para ocultar a Anamnese
function hideAnamnese() {
    var divAnamnese = document.getElementById('anamnese');
    divAnamnese.style.display = 'none';
}

// Ocultar a Anamnese inicialmente
hideAnamnese();

//---------Aparecer Gestante---------

function showGestante() {
    var divGestante = document.getElementById('Gestante');
    divGestante.style.display = 'block';
}

function hideGestante() {
    var divGestante = document.getElementById('Gestante');
    divGestante.style.display = 'none';
    hideAnamnese();
}