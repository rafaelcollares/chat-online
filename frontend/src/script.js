

// Login
const login = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const loginInput = document.querySelector('.login-input')

// Chat
const chat = document.querySelector('.chat')
const chatForm = document.querySelector('.chat-form')
const chatInput = document.querySelector('.chat-input')
const chatMessages = document.querySelector('.chat-messages')
const userConected = document.querySelector('.user-conected')

// Tema
const darkMode = document.querySelector('.dark-mode')
const lightMode = document.querySelector('.light-mode')
const iconDark = document.getElementById("dark")
const iconLight = document.getElementById("light")
const body = document.querySelector('body')




let webSocket

const user = {
  id: "",
  name: "",
  color: "",
  type: ""

}



const colors = {
  red: "red",
  green: "green",
  blue: "blue",
  yellow: "yellow",
  orange: "orange",
  purple: "purple",
  pink: "pink",
  brown: "brown",
  gray: "gray",
  cyan: "cyan",
  magenta: "magenta",
  lime: "lime",
  navy: "navy",
  teal: "teal",
  olive: "olive",
  maroon: "maroon",
  silver: "silver",
  gold: "gold"
}




// Alternar para modo escuro
const toogleModetoDark = () => {
  darkMode.classList.toggle('hidden')
  lightMode.classList.toggle('hidden')
  body.classList.add('dark')
}

// Alternar para modo claro
const toogleModetoLight = () => {
  lightMode.classList.toggle('hidden')
  darkMode.classList.toggle('hidden')
  body.classList.remove('dark')
}

// Gerar cor aleatória
const getRandomColor = () => {
  const colorArray = Object.keys(colors)
  const randomIndex = Math.floor(Math.random() * colorArray.length)
  return colorArray[randomIndex]
}

// Scroll automático
const scrollScreen = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

// Criar mensagem do próprio usuário
const createMessageSelfElement = (content) => {
  const div = document.createElement('div')
  div.classList.add('messages-self')
  div.innerHTML = content
  return div
}

// Criar mensagem de outro usuário
const createMessageOtherElement = (content, name, color) => {
  const div = document.createElement('div')
  const span = document.createElement('span')

  div.classList.add('messages-other')
  span.classList.add('message-sender')
  span.style.color = color
  span.innerHTML = name

  div.appendChild(span)
  div.innerHTML += content

  return div
}



// Processar mensagens recebidas
const processMessage = ({ data }) => {
  const dataParsed = JSON.parse(data)

  if (dataParsed.type === 'system') {
    const div = document.createElement('div')
    div.classList.add('user-conected')

    // Diferencia entrada ou saída
    if (dataParsed.action === 'join') {
      div.textContent = dataParsed.content
      div.style.color = 'green'
    } else if (dataParsed.type === 'leave') {
      div.textContent = dataParsed.content
      div.style.color = 'red'
    } else {
      div.textContent = dataParsed.content
    }

    div.style.opacity = 0
    chatMessages.appendChild(div)
    setTimeout(() => {
      div.style.transition = 'opacity 0.5s'
      div.style.opacity = 1
    }, 50)
    scrollScreen()
    return
  }

  if (dataParsed.type === 'message') {
    const { userID, userName, userColor, content } = dataParsed

    const message = userID === user.id
      ? createMessageSelfElement(content)
      : createMessageOtherElement(content, userName, colors[userColor])

    chatMessages.appendChild(message)
    scrollScreen()
  }

  if(dataParsed.type === 'onlineUsers'){
    const usersOnline = document.querySelector('.user-online-count')
    usersOnline.textContent = dataParsed.content
  }
}

// Login do usuário
const handleLogin = async (e) => {
  e.preventDefault()

  user.id = crypto.randomUUID()
  user.name = loginInput.value
  user.color = getRandomColor()
  user.type = 'join'

  login.style.display = 'none'
  chat.style.display = 'flex'

  webSocket = new WebSocket('wss://chat-online-1-lj8j.onrender.com/')

  webSocket.onopen = () => {
    webSocket.send(JSON.stringify({
      type: "join",
      userID: user.id,
      userName: user.name,
      userColor: user.color

    }))
 
  
  }

  
  webSocket.onmessage = processMessage
}

// Enviar mensagem
const sendMessage = (e) => {
  e.preventDefault()

  const message = {
    userID: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value,
    type:'message'
  }

  webSocket.send(JSON.stringify(message))
  
  chatInput.value = ''
  chatInput.focus()
}





iconDark.addEventListener('click', toogleModetoDark)
iconLight.addEventListener('click', toogleModetoLight)

loginForm.addEventListener('submit', handleLogin)
chatForm.addEventListener('submit', sendMessage)