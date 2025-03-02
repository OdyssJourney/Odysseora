// Fonction pour afficher le formulaire de vérification après l'envoi de l'email
function showVerificationForm(event) {
  event.preventDefault();  // Empêche le rechargement de la page lors de la soumission du formulaire
  document.getElementById('reset-password-form').style.display = 'none'; // Cache le formulaire de réinitialisation
  document.getElementById('verification-form').style.display = 'block'; // Affiche le formulaire de vérification
}

// Fonction pour afficher le message de réinitialisation du mot de passe après la validation du code
function showPasswordResetMessage(event) {
  event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire de code
  document.getElementById('verification-form').style.display = 'none'; // Cache le formulaire de vérification
  document.getElementById('password-reset-message').style.display = 'block'; // Affiche le message de réinitialisation
}

// Ajoute un écouteur d'événement sur le formulaire de réinitialisation du mot de passe
document.getElementById('emailForm').addEventListener('submit', function(event) {
  showVerificationForm(event);
});

// Ajoute un écouteur d'événement sur le formulaire de vérification du code
document.getElementById('verificationForm').addEventListener('submit', function(event) {
  showPasswordResetMessage(event);
});
