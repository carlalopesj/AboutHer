// Fazer a busca pelo id do usuário logado

let usuarioId = null;

document.addEventListener("DOMContentLoaded", function () {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    usuarioId = usuarioLogado ? usuarioLogado.id : null;

    console.log(usuarioId); // Exibe o ID do usuário, caso exista
    if (!usuarioId) {
        alert("Usuário não encontrado!");
        return;
    }

    fetch(`http://localhost:8080/usuarios/${usuarioId}`)
        .then(response => response.json())
        .then(favoritos => {
            const container = document.querySelector('.usuario');
            container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos jogos

            favoritos.forEach(usuario => {
                const infoBox = document.createElement('div');
                infoBox.className = 'usuario-box';

                const infoTexto = document.createElement('div');
                infoTexto.className = 'usuario-texto';

                infoTexto.innerHTML = `
                    <h3>${usuario.time} vs ${usuario.time2}</h3>
                    <p>Horário: ${usuario.horario}</p>
                    <p>Data: ${usuario.data}</p>
                    <p>Local: ${usuario.local}</p>
                    <div class="transmissao">
                        <p>Transmissão: ${usuario.canal}</p>
                    </div>
                `;

                infoBox.appendChild(infoTexto);
                container.appendChild(infoBox);
            });
        })
        .catch(error => console.error('Erro ao buscar os jogos:', error));
});

// Função de editar senha
const formularioCriar = document.querySelector("#Criar"); 
const ISenha = document.querySelector(".senha");
const IConfirmaSenha = document.querySelector(".confirmSenha");
const aviso = document.querySelector(".avisos");

const formularioDeletar = document.querySelector("#Deletar");

function editar() {
    fetch("http://localhost:8080/usuarios/editar", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({
            id: usuarioId,
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
            aviso.style.color='green';
            aviso.textContent = "Senha alterada com sucesso!"
            setTimeout(() => {
                aviso.textContent = '';
            }, 3000);
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
}

formularioCriar.addEventListener('submit', function (event) {
    event.preventDefault();

    if (ISenha.value === IConfirmaSenha.value) {
        editar();
        limpar();
    } else {
        aviso.textContent = "As senhas não conferem";
        setTimeout(() => {
            aviso.textContent = "";
        }, 2000);
    }
});

function limpar() {
    ISenha.value = "";
    IConfirmaSenha.value = "";
}

/* Excluir conta */
function deletar() {
    fetch(`http://localhost:8080/usuarios/${usuarioId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({
            id: usuarioId,
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
            aviso.style.color='green';
            aviso.textContent = "Senha alterada com sucesso!"
            setTimeout(() => {
                aviso.textContent = '';
            }, 3000);
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });
}