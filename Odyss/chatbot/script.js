// 🪙 Initialisation des points et de l'historique
let points = JSON.parse(localStorage.getItem("pointsOdyss")) || 0;
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || {};

// Chargement des données au démarrage
window.onload = function () {
  startApesanteur();
  updatePoints();
  loadChatHistory();
  loadChatHistorySidebar(); // 🔥 Chargement de l'historique dans la sidebar
};

// 🎹 Gestion de la touche "Entrée" pour envoyer un message
document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// 🚀 Fonction d'envoi d'un message utilisateur
function sendMessage() {
  let message = document.getElementById("userInput").value.trim();
  if (message !== "") {
    createBubble(message, "user");
    saveMessage(message, "user");
    addPoints(10);

    document.getElementById("userInput").value = ""; // ✅ Correction : input se vide bien
    document.getElementById("userInput").disabled = true;
    document.getElementById("sendBtn").disabled = true;

    setTimeout(() => {
      liaRespond(message);
    }, 2000);
  }
}

// 💬 Création d'une bulle de message
function createBubble(text, sender) {
  const messages = document.getElementById("messages");
  let bubble = document.createElement("div");
  bubble.classList.add("message-bubble", sender === "user" ? "message-user" : "message-ia");
  bubble.textContent = text;
  messages.appendChild(bubble);

  gsap.from(bubble, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power3.out",
  });

  scrollToBottom();
}

// 🔥 Fonction qui gère l'appel API OpenAI
async function liaRespond(userMessage) {
  createBubble("🤖 LIA réfléchit...", "ia");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer VOTRE_CLE_API`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 50
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Réponse API OpenAI :", data); // Debugging

    let reply = data.choices?.[0]?.message?.content || "🤖 Erreur dans la réponse de LIA.";
    
    let lastBubble = document.querySelector(".message-ia:last-child");
    lastBubble.textContent = reply;
    explosionCosmique(lastBubble);
    saveMessage(reply, "ia");
    
  } catch (error) {
    console.error("❌ Erreur API :", error);
    let lastBubble = document.querySelector(".message-ia:last-child");
    lastBubble.textContent = "⚠️ Problème avec l'IA. Vérifiez la connexion.";
  } finally {
    document.getElementById("userInput").disabled = false;
    document.getElementById("sendBtn").disabled = false;
  }
}

// 📜 Sauvegarde du message avec date
function saveMessage(text, sender) {
  const dateKey = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

  if (!chatHistory[dateKey]) {
    chatHistory[dateKey] = [];
  }

  chatHistory[dateKey].push({ text, sender });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

  loadChatHistorySidebar(); // 🔄 Mise à jour de l'historique dans la sidebar
}

// 🔄 Chargement des messages depuis l'historique
function loadChatHistory() {
  Object.keys(chatHistory).forEach((dateKey) => {
    chatHistory[dateKey].forEach((msg) => {
      createBubble(msg.text, msg.sender);
    });
  });
}

// 📌 Gestion de la Sidebar
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const openSidebarBtn = document.getElementById("openSidebarBtn");
const closeSidebarBtn = document.getElementById("closeSidebar");
const chatContainer = document.querySelector(".chat-container");

// 🔄 Ouvrir la sidebar et ajuster la zone de chat
toggleSidebarBtn.addEventListener("click", () => {
  gsap.to(sidebar, { left: "0px", duration: 0.5, ease: "power2.out" });
  gsap.to(".chatbot", { marginLeft: "250px", width: "calc(100% - 250px)", duration: 0.5, ease: "power2.out" });

  chatContainer.classList.add("sidebar-open"); // ✅ Marquer la sidebar comme ouverte
  toggleSidebarBtn.classList.add("hidden"); // ✅ Cache le bouton "Ouvrir Sidebar"
  openSidebarBtn.classList.remove("hidden"); // ✅ Affiche le bouton "Fermer Sidebar"
});

// ❌ Fermer complètement la sidebar et agrandir le chat
closeSidebarBtn.addEventListener("click", () => {
  gsap.to(sidebar, { left: "-300px", duration: 0.5, ease: "power2.in" });
  gsap.to(".chatbot", { marginLeft: "0", width: "100%", duration: 0.5, ease: "power2.in" });

  chatContainer.classList.remove("sidebar-open"); // ✅ Marquer la sidebar comme fermée
  toggleSidebarBtn.classList.remove("hidden"); // ✅ Affiche le bouton "Ouvrir Sidebar"
  openSidebarBtn.classList.add("hidden"); // ✅ Cache le bouton "Fermer Sidebar"
});

// 🔄 Réouvrir la sidebar après fermeture complète
openSidebarBtn.addEventListener("click", () => {
  gsap.to(sidebar, { left: "0px", duration: 0.5, ease: "power2.out" });
  gsap.to(".chatbot", { marginLeft: "250px", width: "calc(100% - 250px)", duration: 0.5, ease: "power2.out" });

  chatContainer.classList.add("sidebar-open");
  openSidebarBtn.classList.add("hidden");
  toggleSidebarBtn.classList.remove("hidden");
});
