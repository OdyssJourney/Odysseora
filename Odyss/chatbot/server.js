import OpenAI from "openai";
import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const token = process.env["GITHUB_TOKEN"];
if (!token) {
  console.error("❌ Erreur : La clé API GITHUB_TOKEN n'est pas définie.");
  process.exit(1);
}

// Client OpenAI Azure
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com", // Azure conservé
  apiKey: token,
});

let conversationHistory = [{ role: "system", content: "You are a helpful assistant." }];

// Gère la mémoire des tokens
function manageTokenUsage() {
  const maxTokensAllowed = 4096;
  while (JSON.stringify(conversationHistory).length > maxTokensAllowed) {
    conversationHistory.splice(1, 2); // Supprime les anciens messages utilisateur
  }
}

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(path.resolve(), "public")));

// WebSocket pour le chat en temps réel
io.on("connection", (socket) => {
  console.log("🟢 Un utilisateur s'est connecté.");

  socket.on("userMessage", async (message) => {
    console.log("👤 Utilisateur :", message);
    conversationHistory.push({ role: "user", content: message });
    manageTokenUsage();

    try {
      const response = await client.chat.completions.create({
        messages: conversationHistory,
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1,
      });

      if (!response.choices || response.choices.length === 0) {
        socket.emit("aiMessage", "⚠️ Erreur : réponse invalide de l'IA.");
        return;
      }

      const aiResponse = response.choices[0].message.content;
      console.log("🤖 AI :", aiResponse);
      
      conversationHistory.push({ role: "assistant", content: aiResponse });
      socket.emit("aiMessage", aiResponse);
    } catch (error) {
      console.error("❌ Erreur API :", error.message || error);
      socket.emit("aiMessage", "❌ Erreur de communication avec l'IA.");
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 Un utilisateur s'est déconnecté.");
  });
});

// Démarrer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
