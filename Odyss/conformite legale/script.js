document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-link");
    const progressBar = document.getElementById("progress-bar");
    const loadingScreen = document.getElementById("loading-screen");
    const terminalText = document.getElementById("terminal-text");
    const odysseyAnimation = document.getElementById("odyssey-animation");
    const nonConformCards = document.getElementById("non-conform-cards");

    // 🚀 Gestion de la navigation
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Masquer toutes les sections et désactiver les liens
            sections.forEach(section => section.classList.add("hidden"));
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Afficher la section sélectionnée
            let target = this.getAttribute("data-target");
            document.getElementById(target).classList.remove("hidden");
            this.classList.add("active");
        });
    });

    // 🚀 Simulation du chargement IA
    const loadingMessages = [
        "Système en cours de chargement...",
        "Analyse des données...",
        "Connexion à l'IA...",
        "Optimisation des paramètres...",
        "Chargement terminé. Bienvenue !"
    ];

    let index = 0;
    function showLoadingMessages() {
        if (index < loadingMessages.length) {
            terminalText.innerHTML += loadingMessages[index] + "<br>";
            index++;
            setTimeout(showLoadingMessages, 1000);
        } else {
            setTimeout(() => {
                loadingScreen.style.opacity = "0"; // Disparition en douceur
                setTimeout(() => {
                    loadingScreen.style.display = "none"; // Cache l'écran
                    analyzeProject(); // Lancer l'analyse IA
                }, 500);
            }, 1000);
        }
    }

    showLoadingMessages();

    // 🚀 Simulation de l'analyse IA avec une transition fluide
    function analyzeProject() {
        progressBar.style.transition = "width 3s ease-in-out"; // Animation douce
        progressBar.style.width = "100%";

        setTimeout(() => {
            let isConform = Math.random() > 0.5; // 50% chance conforme

            if (isConform) {
                odysseyAnimation.classList.remove("hidden");
                nonConformCards.classList.add("hidden");

                // 💫 Effet cosmique pour un succès
                document.body.style.animation = "flashSuccess 1s ease-in-out";
            } else {
                odysseyAnimation.classList.add("hidden");
                nonConformCards.classList.remove("hidden");

                // 💥 Apparition progressive des erreurs
                displayNonConformIssues();
            }
        }, 3500); // Attendre la fin de la barre de progression
    }

    // ⚠️ Génération des cartes des erreurs détectées avec animation progressive
    function displayNonConformIssues() {
        const issues = [
            { title: "🔒 Sécurité des données", desc: "Stockage non conforme aux normes RGPD." },
            { title: "📜 Mentions légales", desc: "Absence de politique de confidentialité." },
            { title: "📡 Hébergement", desc: "Serveur situé hors de l'Union Européenne." }
        ];
        const issueList = document.getElementById("issue-list");
        issueList.innerHTML = "";

        issues.forEach((issue, index) => {
            setTimeout(() => {
                let card = document.createElement("div");
                card.classList.add("issue-card");
                card.innerHTML = `<h3>${issue.title}</h3><p>${issue.desc}</p>`;
                issueList.appendChild(card);
            }, index * 500); // Affichage progressif des erreurs
        });
    }
});
