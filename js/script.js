// Deixando a rolagem mais lenta
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu responsivo
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Trocando palavras de inspiração
const words = ['Inspiração', 'Coragem', 'Determinação', 'Superação', 'Força', 'Resiliência'];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;
const typingSpeed = 100; // Velocidade de digitação
const deletingSpeed = 80; // Velocidade de deletar
const delayBetweenWords = 900; // Pausa entre palavras

function typeWords() {
    const wordsElement = document.querySelector('.words');

    if (!isDeleting) {
        // Adiciona uma letra
        currentWord = words[wordIndex].substring(0, letterIndex + 1);
        letterIndex++;
        wordsElement.textContent = currentWord;

        // Se a palavra estiver completamente digitada, comece a apagar após um tempo
        if (currentWord === words[wordIndex]) {
            isDeleting = true;
            setTimeout(typeWords, delayBetweenWords); // Pausa antes de começar a apagar
            return;
        }
    } else {
        // Apaga uma letra
        currentWord = words[wordIndex].substring(0, letterIndex - 1);
        letterIndex--;
        wordsElement.textContent = currentWord;

        // Se a palavra foi completamente apagada, passa para a próxima palavra
        if (currentWord === '') {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move para a próxima palavra
        }
    }

    // Ajusta a velocidade de digitação ou de apagar
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWords, speed);
}

// Inicia o efeito de digitação quando a página carregar
document.addEventListener('DOMContentLoaded', typeWords);


// Começando a conectar backend 

document.addEventListener('DOMContentLoaded', function() {
    const idEsporte = 1; // Substitua pelo ID do esporte desejado
    fetch(`http://localhost:8080/abouther/api/jogos?id=${idEsporte}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.info').innerHTML = `
                <h3>Jogo</h3>
                <p>Horário: ${data.horario}</p>
                <p>Data: ${data.data}</p>
                <p>Local: ${data.local}</p>
            `;
        })
        .catch(error => console.error('Erro:', error));
});
