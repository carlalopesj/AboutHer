var formSignin = document.querySelector('#Entrar');
var formSignup = document.querySelector('#Criar');
var btnColor = document.querySelector('.btnColor');
var btnEntrar = document.querySelector('#btnEntrar');
var btnCriar = document.querySelector('#btnCriar');

document.querySelector('#btnEntrar').addEventListener('click', () => {
    formSignin.style.left = "25px";
    formSignup.style.left = "450px";
    btnColor.style.left = "0px";

    btnEntrar.classList.add('active');
    btnCriar.classList.remove('active');
});

document.querySelector('#btnCriar').addEventListener('click', () => {
    formSignin.style.left = "-450px";
    formSignup.style.left = "25px";
    btnColor.style.left = "110px";

    btnCriar.classList.add('active');
    btnEntrar.classList.remove('active');
});

function trocarFormCadEntrar() {
    formSignin.style.left = "25px";
    formSignup.style.left = "450px";
    btnColor.style.left = "0px";

    btnEntrar.classList.add('active');
    btnCriar.classList.remove('active');
}

// Conectando com o backend

const formulario = document.querySelector("#Criar");  // Certo ID aqui
const Iemail = document.querySelector(".email");
const ISenha = document.querySelector(".senha");
const IConfirmaSenha = document.querySelector(".confirmSenha");
const aviso = document.querySelector(".avisos");

function cadastrar() {
    fetch("http://localhost:8080/usuarios/cadastrar", {  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email: Iemail.value,
            senha: ISenha.value
        })
    })
    .then(function (res) {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(function (data) {
        console.log(data); 
    })
    .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function limpar() {
    Iemail.value = "";
    ISenha.value = "";
    IConfirmaSenha.value = "";
}

formSignup.addEventListener('submit', function (event) {
    event.preventDefault();

    if (ISenha.value === IConfirmaSenha.value) {
        cadastrar();
        limpar();
        trocarFormCadEntrar();
    } else {
        aviso.textContent = "As senhas não conferem";
        setTimeout(() => {
            aviso.textContent = "";
        }, 2000);
    }
});

// Parte do Login

const emailInput = document.querySelector(".iLoginEmail");
const senhaInput = document.querySelector(".iLoginSenha");

function login() {

    fetch("http://localhost:8080/usuarios/login", {  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email: emailInput.value,
            senha: senhaInput.value
        })
    })
    .then(function (res) {
        if (!res.ok) {
            throw new Error('Credenciais inválidas');
        }
        return res.json();
    })
    .then(function (data) {
        // Login bem-sucedido
        window.location.href = "./index.html";
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
        loginLocal(emailInput.value);
        console.log('Login realizado com sucesso', data);
    })
    .catch(function (error) {
        console.error('Erro durante o login:', error);
        // Exibir mensagem de erro para o usuário
        aviso.style.color='red';
        aviso.textContent = "Email ou senha incorretos!"
        setTimeout(() => {
            aviso.textContent = '';
        }, 3000);
    });
}

formSignin.addEventListener('submit', function (event) {
    event.preventDefault();  
    login();
});

// Função de login local (simulado) e armazenamento de inicial
function loginLocal(email) {
    const userInitial = email.charAt(0).toUpperCase();
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userInitial', userInitial);
    window.location.href = "index.html";
}
