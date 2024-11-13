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
    fetch(`http://localhost:8080/favoritos/${usuarioId}`) // Substitua pela sua rota de API que retorna os favoritos
        .then(response => response.json())
        .then(favoritos => {
            const container = document.querySelector('.favorito');
            container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos jogos

            favoritos.forEach(favorito => {
                const infoBox = document.createElement('div');
                infoBox.className = 'usuario-box';

                const infoTexto = document.createElement('div');
                infoTexto.className = 'usuario-texto';

                infoTexto.innerHTML = `
                    <h3>${favorito.time} vs ${favorito.time2}</h3>
                    <p>Horário: ${favorito.horario}</p>
                    <p>Data: ${favorito.data}</p>
                    <p>Local: ${favorito.local}</p>
                    <div class="transmissao">
                        <p>Transmissão: ${favorito.canal}</p>
                    </div>
                `;

                infoBox.appendChild(infoTexto);
                container.appendChild(infoBox);
            });
        })
        .catch(error => console.error('Erro ao buscar os jogos:', error));
});