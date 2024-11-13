// Fazer a busca pelo id do usuário logado
document.addEventListener("DOMContentLoaded", function() {
    // Recupera o item do localStorage e converte de JSON para objeto
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Acessa o campo 'id' do objeto, caso ele exista
    const usuarioId = usuarioLogado ? usuarioLogado.id : null;

    console.log(usuarioId); // Exibe o ID do usuário, caso exista
            if (!usuarioId) {
                alert("Usuário não encontrado!");
                return;
            }
    fetch(`http://localhost:8080/usuarios/${usuarioId}`) // Substitua pela sua rota de API que retorna os favoritos
        .then(response => response.json())
        .then(usuarios => {
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