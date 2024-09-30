document.addEventListener('DOMContentLoaded', (event) => {
    const inputMensagem = document.getElementById('inputMensagem');
    const botaoEnviar = document.getElementById('botaoEnviar');
    const mensagensContainer = document.querySelector('.mensagens');

    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const mensagemDiv = document.createElement('div');
        mensagemDiv.classList.add('mensagem___cliente');
        mensagemDiv.innerHTML = `<span class="nome-outro">${message.name}</span> ${message.text}`;
        mensagensContainer.appendChild(mensagemDiv);
    };

    botaoEnviar.addEventListener('click', () => {
        const message = {
            name: 'Usuário desconhecido : ', // Você pode substituir isso pelo nome do usuário real
            text: inputMensagem.value
        };

        // Exibe a mensagem localmente
        const mensagemDiv = document.createElement('div');
        mensagemDiv.classList.add('mensagen___self');
        mensagemDiv.textContent = message.text;
        mensagensContainer.appendChild(mensagemDiv);

        // Envia a mensagem para o servidor
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }

        inputMensagem.value = ''; // Limpa o input após enviar a mensagem
    });
});