# 💬 Real-Time Chat Application

Aplicação de **chat em tempo real** desenvolvida com **Node.js, Express e WebSockets**, permitindo que múltiplos usuários entrem no chat, enviem mensagens instantaneamente e acompanhem quantos usuários estão conectados.

O projeto demonstra comunicação **cliente-servidor em tempo real**, manipulação de eventos WebSocket e construção de uma interface interativa com JavaScript.

---

# 🚀 Live Demo

Acesse a aplicação online:

👉 https://chat-online-2-z1nd.onrender.com/

Digite um nome e comece a conversar em tempo real com outros usuários conectados.

---

# 🧠 Tecnologias Utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* WebSocket Client API

### Backend

* Node.js
* Express
* ws (WebSocket Server)

---

# ⚙️ Funcionalidades

### 👤 Login de usuário

Antes de entrar no chat, o usuário define um nome.

Cada usuário recebe automaticamente:

* um **ID único** (`crypto.randomUUID`)
* uma **cor aleatória**
* uma **conexão WebSocket**

---

### 💬 Chat em tempo real

As mensagens são transmitidas instantaneamente para todos os usuários conectados.

Fluxo:

1. Usuário envia mensagem
2. Cliente envia mensagem via WebSocket
3. Servidor recebe e faz **broadcast**
4. Todos os clientes recebem e exibem a mensagem

---

### 🟢 Usuários Online

O servidor calcula o número de conexões ativas:

```
wss.clients.size
```

Sempre que um usuário entra ou sai do chat, todos os clientes recebem a atualização.

---

### 🔔 Notificações do sistema

O chat exibe notificações quando:

* um usuário entra no chat
* um usuário sai do chat

Exemplo:

```
Rafael entrou no chat
Maria saiu do chat
```

---

### 🎨 Identificação por cor

Cada usuário recebe uma **cor aleatória**, facilitando a identificação das mensagens no chat.

Exemplo:

```
João: Olá pessoal!
Maria: Oi João!
```

---

### 🌙 Dark Mode

A interface possui alternância entre:

* modo claro
* modo escuro

Utilizando manipulação de classes CSS com JavaScript.

---

# 📡 Arquitetura do Sistema

Fluxo simplificado da aplicação:

```
Cliente
   │
   │ WebSocket
   ▼
Servidor Node.js
   │
   │ Broadcast de mensagens
   ▼
Todos os clientes conectados
```

Cada mensagem enviada é redistribuída para todos os usuários conectados ao servidor.

---

# 📁 Estrutura do Projeto

```
chat-app
│
├── server.js
├── package.json
│
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

# ▶️ Como Rodar o Projeto Localmente

### 1️⃣ Clonar o repositório

```
git clone https://github.com/seuusuario/chat-websocket.git
```

---

### 2️⃣ Instalar dependências

```
npm install
```

---

### 3️⃣ Iniciar o servidor

```
node server.js
```

O servidor estará disponível em:

```
http://localhost:8080
```

---

# 🔌 Deploy

O projeto está hospedado na plataforma **Render**.

Aplicação online:

👉 https://chat-online-2-z1nd.onrender.com/

Para produção é utilizado **WSS (WebSocket Secure)** para comunicação segura.

---

# 📌 Melhorias Futuras

Algumas melhorias planejadas para o projeto:

* persistência de mensagens em banco de dados
* criação de salas de chat
* sistema de autenticação
* envio de emojis
* upload de imagens
* indicador "usuário digitando"

---

# 👨‍💻 Autor

Desenvolvido por **Rafael Collares**

Se você gostou do projeto, considere deixar uma ⭐ no repositório.
