function storeTraumaIcon(x, y, traumaType) {
    let traumaIcons = JSON.parse(localStorage.getItem('traumaIcons')) || [];
    traumaIcons.push({ x, y, traumaType });
    localStorage.setItem('traumaIcons', JSON.stringify(traumaIcons));
}

function removeLastTraumaIcon() {
    let traumaIcons = JSON.parse(localStorage.getItem('traumaIcons')) || [];
    if (traumaIcons.length > 0) {
        traumaIcons.pop();
        localStorage.setItem('traumaIcons', JSON.stringify(traumaIcons));

        let imageContainer = document.getElementById('imageContainer');
        let lastIcon = imageContainer.lastElementChild;
        if (lastIcon.tagName === 'IMG') {
            imageContainer.removeChild(lastIcon);
        }
    }
}

function recreateTraumaImage() {
    let traumaIcons = JSON.parse(localStorage.getItem('traumaIcons')) || {};
    traumaIcons.forEach(icon => {
        createTraumaIcon(icon.x, icon.y, icon.traumaType);
    });
}

function createTraumaIcon(x, y, traumaType) {
    let icon = document.createElement('img');
    icon.src = `/trauma_icon/${traumaType}.png`;
    icon.style.position = 'absolute';
    let iconWidth = 50;
    let iconHeight = 50;
    icon.style.left = `${x - iconWidth / 2}px`;
    icon.style.top = `${y - iconHeight / 2}px`;
    icon.style.width = `${iconWidth}px`;
    icon.style.height = `${iconHeight}px`;
    icon.style.padding = '0';
    document.getElementById('imageContainer').appendChild(icon);
}

document.addEventListener('DOMContentLoaded', recreateTraumaImage);

document.getElementById('undoBtn').addEventListener('click', function () {
    removeLastTraumaIcon();
});

document.getElementById('nextBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    let canvas = await html2canvas(document.getElementById('imageContainer'));
    let imgData = canvas.toDataURL('image/png');

    let formData = JSON.parse(localStorage.getItem('formData')) || {};

    formData['traumaImage'] = imgData;

    localStorage.setItem('formData', JSON.stringify(formData));

    console.log('Stored Data:', formData);  

    window.location.href = 'traumaDesc.html';
});

let img = document.getElementById('corpo');
img.addEventListener('click', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    let traumaType = document.getElementById('traumaType').value;

    storeTraumaIcon(x, y, traumaType);
    createTraumaIcon(x, y, traumaType);
});

function imageLogin() {
    fetch('/home').then(res => res.json()).then(data => {
        if (data.loggedin) {
            window.location.href = '/home.html';
        } else {
            window.location.href = '/login.html';
        }
    }).catch(err => {
        console.error(err);
        alert('Erro de conexão!');
    });
}

const activeLink = document.querySelector('.list-group-item.active');

if (activeLink) {
    activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}