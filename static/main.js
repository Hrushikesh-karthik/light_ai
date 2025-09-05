const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");

let userMessage = "";

const createMsgElement = (content, ...classe) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classe);
  div.innerHTML = content;
  return div;
};

const generateResponse = async (botMsgDIV) => {
  try {
    const response = await fetch("/chat", {   // <--- CALL FLASK, not Gemini
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    botMsgDIV.classList.remove("loading");
    botMsgDIV.querySelector(".message-text").textContent = data.reply || "Error: No reply";
  } catch (error) {
    botMsgDIV.querySelector(".message-text").textContent = "Error: " + error.message;
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  userMessage = promptInput.value.trim();
  if (!userMessage) return;
  promptInput.value = "";

  // User message
  const userMsgHTML = '<p class="message-text"></p>';
  const userMsgDIV = createMsgElement(userMsgHTML, "user-message");
  userMsgDIV.querySelector(".message-text").textContent = userMessage;
  chatsContainer.appendChild(userMsgDIV);

  // Bot placeholder
  setTimeout(() => {
    const botMsgHTML = '<div class="Light">L</div><p class="message-text">Just a sec..</p>';
    const botMsgDIV = createMsgElement(botMsgHTML, "bot-message", "loading");
    chatsContainer.appendChild(botMsgDIV);
    generateResponse(botMsgDIV);
  }, 600);
};

promptForm.addEventListener("submit", handleFormSubmit);
