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
document.addEventListener('DOMContentLoaded', () => {
    typeWords();
    updateLoginState();
    addEventListeners(); // Certifique-se de chamar esta função aqui
});


const userInitial = localStorage.getItem('userInitial');
const userIcon = document.querySelector('.icone-usuario');

// Exibe a inicial do usuário e oculta "Cadastrar/Entrar" após login
window.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userInitial = localStorage.getItem('userInitial');
    const btnCadEntrar = document.querySelector('.btn-cad');

    if (isLoggedIn) {
        btnCadEntrar.style.display = "none";
        userIcon.textContent = userInitial;
    }
});

// Função para atualizar o estado de login e exibir ou ocultar elementos
function updateLoginState() {
    const loginRegisterLink = document.querySelector('.btn-cad');

    if (userInitial) {
        userIcon.textContent = userInitial;
        userIcon.style.display = 'flex';
        if (loginRegisterLink) loginRegisterLink.style.display = 'none';
    } else {
        userIcon.style.display = 'none';
        if (loginRegisterLink) loginRegisterLink.style.display = 'inline-block';
    }
}

// Função para alternar visibilidade do menu2
function toggleDropdown() {
    console.log("Clicado")
    const menu2 = document.querySelector('.menu2');
    menu2.classList.toggle('show');
}

// Adiciona clique no ícone do usuário
function addEventListeners() {
    const userIcon = document.querySelector('.icone-usuario');
    if (userIcon) {
        userIcon.addEventListener('click', toggleDropdown);
        console.log("Adicionando evento ao icone-usuario"); // Verifica se o evento é adicionado
    }
    
    const logoutButton = document.querySelector('.sair-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }
}

function logoutUser() {
    // Remove o estado de login e a inicial do usuário do localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInitial');
    
    // Atualiza a interface
    const userIcon = document.querySelector('.icone-usuario');
    const loginRegisterLink = document.querySelector('.btn-cad');

    userIcon.style.display = 'none';
    if (loginRegisterLink) loginRegisterLink.style.display = 'inline-block';
    
    // Opcional: Redirecionar para a página inicial ou de login após o logout
    window.location.href = './autenticacao.html'; // Ajuste o caminho conforme necessário
}

// Certifique-se de adicionar o evento de clique no botão "Sair"
document.querySelector('.sair-btn').addEventListener('click', logoutUser);


// Menu responsivo
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Efeito de rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

