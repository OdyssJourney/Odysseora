// 🟢 Configurer Supabase
const { createClient } = supabase;
const supabaseUrl = "https://xxxxx.supabase.co";  // 🔄 Mets ton URL Supabase ici
const supabaseKey = "public-anon-key";  // 🔄 Mets ta clé publique ici
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// 🟢 Initialiser le Chat
const socket = io(window.location.origin);
const chatBox = document.getElementById("messages");
const userInput = document.getElementById("userInput");

// 🟢 Fonction pour récupérer l'utilisateur connecté
async function getUserId() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user ? user.id : null;
}

// 🟢 Fonction d'envoi de message
function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    // Créer la bulle de message utilisateur
    const userBubble = document.createElement("div");
    userBubble.classList.add("user-message");
    userBubble.innerHTML = message.replace(/\n/g, "<br>");
    chatBox.appendChild(userBubble);

    // Reset l'input et auto-resize
    userInput.value = "";
    autoResize();

    // Scroll smooth
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth",
    });

    // Envoyer le message au serveur
    socket.emit("userMessage", message);
}

// 🟢 Réception du message IA
socket.on("aiMessage", (message) => {
    const aiMessageElement = document.createElement("div");
    aiMessageElement.classList.add("ai-message");
    chatBox.appendChild(aiMessageElement);

    let i = 0;
    const typingSpeed = 30;

    function typeMessage() {
        if (i < message.length) {
            aiMessageElement.innerHTML += message.charAt(i);
            i++;
            chatBox.scrollTo({
                top: chatBox.scrollHeight,
                behavior: "smooth",
            });
            setTimeout(typeMessage, typingSpeed);
        }
    }
    typeMessage();
});

// 🟢 Fonction d'auto-redimensionnement du champ de saisie
userInput.addEventListener("input", autoResize);

function autoResize() {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";
}

// 🟢 Sélection des boutons et champs de résumé
const generateSummaryButton = document.getElementById("generate-summary");
const editSummaryButton = document.getElementById("edit-summary");
const saveSummaryButton = document.getElementById("save-summary");
const summaryText = document.getElementById("summary-text");

// 🟢 Générer le résumé (simulation IA)
generateSummaryButton.addEventListener("click", async () => {
    const userId = await getUserId();
    if (!userId) {
        alert("Vous devez être connecté pour générer un résumé !");
        return;
    }

    const summary = "Résumé généré automatiquement"; // Simulation IA
    summaryText.value = summary; 
    summaryText.disabled = false; // Activer l'édition

    editSummaryButton.disabled = false; // Activer le bouton Modifier
    saveSummaryButton.disabled = false; // Activer le bouton Sauvegarder
});

// 🟢 Modifier le résumé
editSummaryButton.addEventListener("click", () => {
    summaryText.disabled = false; // Activer l'édition
});

// 🟢 Sauvegarder le résumé dans Supabase
saveSummaryButton.addEventListener("click", async () => {
    const userId = await getUserId();
    if (!userId) {
        alert("Vous devez être connecté pour sauvegarder un résumé !");
        return;
    }

    const summary = summaryText.value.trim();
    if (!summary) {
        alert("Le résumé est vide !");
        return;
    }

    // Vérifier si l'utilisateur a déjà un résumé
    const { data: existingSummary, error: fetchError } = await supabaseClient
        .from("summaries")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

    if (fetchError) {
        console.error("Erreur lors de la vérification du résumé :", fetchError);
        return;
    }

    if (existingSummary) {
        // 🟢 Mettre à jour le résumé existant
        const { error: updateError } = await supabaseClient
            .from("summaries")
            .update({ summary_text: summary })
            .eq("id", existingSummary.id);

        if (updateError) {
            console.error("Erreur lors de la mise à jour :", updateError);
        } else {
            alert("Résumé mis à jour avec succès !");
        }
    } else {
        // 🟢 Insérer un nouveau résumé
        const { error: insertError } = await supabaseClient
            .from("summaries")
            .insert([{ summary_text: summary, user_id: userId }]);

        if (insertError) {
            console.error("Erreur lors de l'insertion :", insertError);
        } else {
            alert("Résumé sauvegardé avec succès !");
        }
    }
});

// 🟢 Charger le résumé de l'utilisateur au démarrage
async function loadSummary() {
    const userId = await getUserId();
    if (!userId) return;

    const { data, error } = await supabaseClient
        .from("summaries")
        .select("summary_text")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.error("Erreur lors de la récupération du résumé :", error);
    } else if (data) {
        summaryText.value = data.summary_text;
        summaryText.disabled = true;
        editSummaryButton.disabled = false;
        saveSummaryButton.disabled = false;
    }
}

// 🟢 Test de connexion Supabase
(async () => {
    const { data, error } = await supabaseClient.from("summaries").select("*").limit(1);
    if (error) {
        console.error("Connexion Supabase échouée :", error);
    } else {
        console.log("Connexion Supabase réussie ! 🚀", data);
    }

    await loadSummary(); // Charger le résumé au démarrage
})();
