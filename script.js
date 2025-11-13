//  Sistema inteligente de chat con opciones y flujo conversacional
let conversationState = 'initial';

function toggleChat() {
  const chat = document.getElementById('whatsappChat');
  chat.classList.toggle('active');
  
  if (chat.classList.contains('active')) {
    document.querySelector('.whatsapp-badge').style.display = 'none';
  }
}

function selectOption(option) {
  const chatBody = document.getElementById('chatBody');
  const phoneNumber = '50492137292';
  
  let message = '';
  let responseText = '';
  
  switch(option) {
    case 'cotizar':
      responseText = '📋 Perfecto, te ayudaré con la cotización.<br><br>Nuestros equipos disponibles:<br>• Montacargas (2-5T)<br>• Plataformas elevadoras<br>• Pallet Jacks<br><br>¿Quieres conectar con un asesor para detalles?';
      message = 'Hola, me gustaría cotizar equipos industriales';
      conversationState = 'cotizar';
      break;
    
    case 'mantenimiento':
      responseText = '🔧 Ofrecemos servicios de mantenimiento:<br>• Preventivo<br>• Correctivo<br>• Inspecciones<br><br>¿Te conecto con nuestro especialista?';
      message = 'Necesito información sobre mantenimiento de equipos';
      conversationState = 'mantenimiento';
      break;
    
    case 'repuestos':
      responseText = '⚙️ Tenemos repuestos originales para:<br>• Montacargas<br>• Sistemas hidráulicos<br>• Baterías<br><br>¿Hablamos con un técnico?';
      message = 'Busco repuestos para equipos industriales';
      conversationState = 'repuestos';
      break;
    
    case 'asesor':
      message = 'Hola, necesito hablar con un asesor de ventas';
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      addBotMessage('✅ Te estamos conectando con un asesor. En breve te atenderán por WhatsApp.');
      return;
  }
  
  // Agregar mensaje del usuario
  addUserMessage(option);
  
  // Agregar respuesta del bot con botones
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message';
    botMsg.innerHTML = `
      ${responseText}
      <div class="chat-options">
        <button class="chat-option-btn" onclick="contactAdvisor('${message}')">✅ Sí, conectar</button>
        <button class="chat-option-btn" onclick="resetChat()">🔄 Volver al inicio</button>
      </div>
      <div class="chat-time">${getCurrentTime()}</div>
    `;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}

function contactAdvisor(message) {
  const phoneNumber = '50492137292';
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  addBotMessage('✅ Perfecto! Te hemos redirigido a WhatsApp. Uno de nuestros asesores te atenderá enseguida. 👨‍💼');
}

function addUserMessage(option) {
  const chatBody = document.getElementById('chatBody');
  const optionTexts = {
    'cotizar': '💰 Quiero cotizar un equipo',
    'mantenimiento': '🔧 Necesito mantenimiento',
    'repuestos': '⚙️ Busco repuestos',
    'asesor': '👤 Hablar con asesor'
  };
  
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message';
  userMsg.style.background = '#DCF8C6';
  userMsg.style.marginLeft = 'auto';
  userMsg.innerHTML = `
    ${optionTexts[option]}
    <div class="chat-time">${getCurrentTime()}</div>
  `;
  chatBody.appendChild(userMsg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(text) {
  const chatBody = document.getElementById('chatBody');
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-message';
    botMsg.innerHTML = `
      ${text}
      <div class="chat-time">${getCurrentTime()}</div>
    `;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 600);
}

function resetChat() {
  const chatBody = document.getElementById('chatBody');
  chatBody.innerHTML = `
    <div class="chat-message">
      ¡Hola! 👋 Bienvenido a <strong>ENERHNSYS</strong><br><br>
      Somos especialistas en equipos industriales. ¿Cómo podemos ayudarte?
      <div class="chat-options">
        <button class="chat-option-btn" onclick="selectOption('cotizar')">💰 Cotizar Equipo</button>
        <button class="chat-option-btn" onclick="selectOption('mantenimiento')">🔧 Mantenimiento</button>
        <button class="chat-option-btn" onclick="selectOption('repuestos')">⚙️ Repuestos</button>
        <button class="chat-option-btn" onclick="selectOption('asesor')">👤 Hablar con Asesor</button>
      </div>
      <div class="chat-time">Ahora</div>
    </div>
  `;
  conversationState = 'initial';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (message) {
    const phoneNumber = '50492137292';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    input.value = '';
  }
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}
