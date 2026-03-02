// Importação do ws
const http = require('http');
const { WebSocketServer } = require('ws');

// Importação do dotenv
const dotenv = require('dotenv');
dotenv.config();

// Criação do servidor
const server = http.createServer();
const wss = new WebSocketServer({ server });


server.listen(process.env.PORT || 8080, () => {
    console.log('Servidor rodando');
});

function onlineUsers() {
    const onlineMessages ={
            type: 'onlineUsers',
            content: wss.clients.size
        }
    wss.clients.forEach((client)=>{
    if(client.readyState === 1){
        client.send(JSON.stringify(onlineMessages))
    }
})  
console.log("Usuários Online", wss.clients.size)
    }


// Criar evento de conexão
wss.on('connection', (ws) => {

    
    
    ws.on("error", console.error);

    ws.on('message', (data) => {
        const dataParsed = JSON.parse(data);
        
        // Salva o nome no socket
        ws.userName = dataParsed.userName;
        if (dataParsed.type === 'join') {
            const systemMessage = {
                type: 'system',
                action: 'join',
                content: `${ws.userName} entrou no chat`
            };

            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify(systemMessage));
                    
                    
                }
            });
            onlineUsers()
        }

        if (dataParsed.type === 'message') {
            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify(dataParsed));
                }
            });
            console.log('mensagem enviada');
        }
    });

        

    // Evento de desconexão
    ws.on('close', () => {
        if (!ws.userName) return; // ignora se o usuário nunca entrou

        const leftMessage = {
            type: 'system',
            action: 'leave',
            content: `${ws.userName} saiu do chat`
        };

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify(leftMessage));
            }
        });
            onlineUsers()

    });

}); // Fim do wss.on('connection')