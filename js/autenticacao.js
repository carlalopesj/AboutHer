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
    fetch("http://localhost:8080/usuarios", {  
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

formulario.addEventListener('submit', function (event) {
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
