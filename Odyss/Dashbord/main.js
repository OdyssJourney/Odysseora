document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".content-section");

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // Empêche le rechargement de la page

            const targetId = this.getAttribute("data-target"); // Récupère l'ID cible
            const targetSection = document.getElementById(targetId); 

            if (!targetSection) {
                console.error("Section introuvable pour:", targetId);
                return;
            }

            // Masquer toutes les sections
            sections.forEach(section => {
                section.classList.remove("active");
                section.style.display = "none";
            });

            // Afficher uniquement la section ciblée
            targetSection.classList.add("active");
            targetSection.style.display = "block";

            // Supprimer "active" des anciens éléments du menu et l'ajouter à l'élément cliqué
            menuItems.forEach(item => item.parentElement.classList.remove("active"));
            this.parentElement.classList.add("active");
        });
    });
});



// Gestion du menu responsive
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};
document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profile-pic");
    const profileUpload = document.getElementById("profile-upload");

    // Vérifie s'il y a déjà une image enregistrée
    if (localStorage.getItem("profileImage")) {
        profilePic.src = localStorage.getItem("profileImage");
    }

    // Quand l'utilisateur clique sur l'image, ouvrir l'input file
    profilePic.addEventListener("click", function () {
        profileUpload.click();
    });

    // Quand une image est sélectionnée, la mettre à jour
    profileUpload.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
                localStorage.setItem("profileImage", e.target.result); // Sauvegarde l'image
            };
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const notificationBubble = document.getElementById("notification-bubble");
    const notificationMenu = document.querySelector('[data-target="notifications"]');

    // 📌 Vérifie s'il y a des notifications enregistrées en mémoire
    let notificationCount = localStorage.getItem("notificationCount") || 0;
    updateNotificationBubble(notificationCount);

    // 📩 Simulation : Un nouveau message arrive après 5 secondes
    setTimeout(() => {
        receiveNewNotification();
    }, 5000);

    // 📬 Fonction pour simuler la réception d'un nouveau message
    function receiveNewNotification() {
        notificationCount++;
        localStorage.setItem("notificationCount", notificationCount);
        updateNotificationBubble(notificationCount);
    }

    // ✅ Met à jour l'affichage de la bulle de notification
    function updateNotificationBubble(count) {
        if (count > 0) {
            notificationBubble.textContent = count;
            notificationBubble.classList.remove("hidden");
        } else {
            notificationBubble.classList.add("hidden");
        }
    }

    // 👀 Quand l'utilisateur clique sur Notifications, on remet le compteur à 0
    notificationMenu.addEventListener("click", function () {
        notificationCount = 0;
        localStorage.setItem("notificationCount", notificationCount);
        updateNotificationBubble(notificationCount);
    });
});
// Changement de thème
document.getElementById("change-theme").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

// Animation d'affichage des sections
document.querySelectorAll(".content-section").forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(20px)";
});

window.addEventListener("load", () => {
    document.querySelectorAll(".content-section").forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }, index * 200);
    });
});


// Téléchargement fictif
document.getElementById("download-report").addEventListener("click", () => {
    alert("📂 Téléchargement en cours...");
});

document.getElementById("download-examples").addEventListener("click", () => {
    alert("📂 Exemple téléchargé !");
});

document.addEventListener("DOMContentLoaded", () => {
    const notifContainer = document.getElementById("notification-container");
    const addNotifBtn = document.getElementById("add-notification");

    const messages = [
        "⚡ Un nouvel oracle a parlé.",
        "🌊 Une tempête approche, préparez votre navire.",
        "🔥 Un nouveau défi vous attend à l'horizon.",
        "🕊️ Un message secret est arrivé."
    ];

    addNotifBtn.addEventListener("click", () => {
        const emptyMsg = document.querySelector(".empty-msg");
        if (emptyMsg) emptyMsg.remove(); // Supprime le message "Aucune notification"

        // Création d'une nouvelle notification
        let notif = document.createElement("div");
        notif.classList.add("notification");
        notif.textContent = messages[Math.floor(Math.random() * messages.length)];

        // Ajout au conteneur
        notifContainer.appendChild(notif);

        // Supprimer la notification après 5 sec avec effet de fumée
        setTimeout(() => {
            notif.style.animation = "fadeOut 0.8s ease-in-out forwards";
            setTimeout(() => notif.remove(), 800);
        }, 500000);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const parchment = document.querySelector(".parchment");
    const downloadBtn = document.getElementById("download-report");

    // Effet de déroulement au clic
    parchment.addEventListener("click", () => {
        parchment.classList.toggle("open");
    });

    // Téléchargement fictif du rapport
    downloadBtn.addEventListener("click", () => {
        let link = document.createElement("a");
        link.href = "assets/rapport-odyss.pdf"; // Remplace par un vrai fichier
        link.download = "rapport-odyss.pdf";
        link.click();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Mode nuit
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode", this.checked);
    });

    // Sons activés/désactivés
    const soundToggle = document.getElementById("sound-toggle");
    soundToggle.addEventListener("change", function () {
        alert("Sons " + (this.checked ? "activés" : "désactivés"));
    });

    // Mise à jour du compte
    document.getElementById("update-account").addEventListener("click", function () {
        alert("Compte mis à jour !");
    });

    // Effacer l'historique
    document.getElementById("clear-history").addEventListener("click", function () {
        if (confirm("Voulez-vous vraiment effacer l'historique ?")) {
            alert("Historique effacé !");
        }
    });

    // Se déconnecter
    document.getElementById("logout").addEventListener("click", function () {
        if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
            window.location.href = "login.html"; // Redirection vers la page de connexion
        }
    });

    // Supprimer le compte
    document.getElementById("delete-account").addEventListener("click", function () {
        if (confirm("Êtes-vous sûr ? Cette action est irréversible.")) {
            alert("Compte supprimé !");
            window.location.href = "index.html"; // Redirige vers la page d'accueil
        }
    });
});
