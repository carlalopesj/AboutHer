
document.addEventListener('DOMContentLoaded', () => {
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        box.classList.add('show');
    });
});
const images = document.querySelectorAll('.imagens img');

let currentIndex = 0;

/* trocar imagem em sequencia */
function showNextImage() {

    images[currentIndex].classList.remove('active');
    
   /* ciclo das imagens */
    currentIndex = (currentIndex + 1) % images.length;
    
    images[currentIndex].classList.add('active');
}

images[currentIndex].classList.add('active');

setInterval(showNextImage, 3000);

// Buscando os jogos
// info.js

function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');  // O valor do parâmetro 'id'
}

document.addEventListener("DOMContentLoaded", function() {
    const idEsporte = getIdFromUrl();  // Captura o id do esporte
            if (!idEsporte) {
                alert("Esporte não encontrado!");
                return;
            }
    fetch(`http://localhost:8080/jogos/${idEsporte}`) // Substitua pela sua rota de API que retorna os jogos
        .then(response => response.json())
        .then(jogos => {
            const container = document.querySelector('.informacao');
            container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos jogos

            jogos.forEach(jogo => {
                const infoBox = document.createElement('div');
                infoBox.className = 'info-box';

                const infoTexto = document.createElement('div');
                infoTexto.className = 'info-texto';

                infoTexto.innerHTML = `
                    <h3>${jogo.timeX} vs ${jogo.timeY}</h3>
                    <p>Horário: ${jogo.horario}</p>
                    <p>Data: ${jogo.data}</p>
                    <p>Local: ${jogo.local}</p>
                    <div class="transmissao">
                        <img src="./assets/icones/${jogo.canal}.png" alt="Canal Logo"/>
                        <p>Transmissão: ${jogo.canal}</p>
                    </div>
                `;

                infoBox.appendChild(infoTexto);
                container.appendChild(infoBox);
            });
        })
        .catch(error => console.error('Erro ao buscar os jogos:', error));
});
