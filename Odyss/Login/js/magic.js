const uname = document.querySelector('#uname');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const btnContainer = document.querySelector('.btn-container');
const btn = document.querySelector('#login-btn');
const msg = document.querySelector('.msg');
const fullNameSignup = document.querySelector('#full-name-signup');
const usernameSignup = document.querySelector('#username-signup');
const emailSignup = document.querySelector('#email-signup');
const passwordSignup = document.querySelector('#password-signup');
const registerBtnSignup = document.querySelector('#register-btn-signup');
const msgSignup = document.querySelector('#msg-signup');


// Initialement, désactiver le bouton
btn.disabled = true;

// Fonction pour déplacer le bouton et afficher les messages
function shiftButton() {
    showMsg();
    
    const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
    const currentPosition = positions.find(dir => btn.classList.contains(dir));
    const nextPosition = currentPosition ? positions[(positions.indexOf(currentPosition) + 1) % positions.length] : 'shift-left';
    
    btn.classList.remove(currentPosition); // Retirer la position actuelle
    btn.classList.add(nextPosition); // Ajouter la prochaine position
}

// Fonction pour vérifier si les champs sont remplis et afficher un message
function showMsg() {
    const isEmpty = uname.value === '' || email.value === '' || pass.value === '';
    
    if (isEmpty) {
        btn.disabled = true;
        msg.style.color = 'rgb(218, 49, 49)';
        msg.innerText = 'Please fill in all the fields before proceeding';
        
        btn.classList.remove('no-shift'); // Permet au bouton de bouger si les champs sont vides
        btn.classList.remove('shift-center'); // Retirer la position centre
    } else {
        msg.innerText = 'Great! Now you can proceed';
        msg.style.color = '#92ff92';
        btn.disabled = false;
        
        // Réinitialiser la position du bouton au centre
        btn.classList.remove('shift-left', 'shift-top', 'shift-right', 'shift-bottom'); // Retirer toutes les positions
        btn.classList.add('shift-center'); // Remettre le bouton au centre
        
        btn.classList.add('no-shift'); // Empêche le bouton de se déplacer quand les champs sont remplis
    }
}
// Fonction de validation du formulaire "Sign Up"
function validateSignupForm() {
    // Valider nom complet
    if (fullNameSignup.value.trim() === '') {
      msgSignup.innerText = 'Full Name is required.';
      msgSignup.style.color = 'rgb(218, 49, 49)';
      return false;
    }
  
    // Valider nom d'utilisateur
    if (usernameSignup.value.trim() === '') {
      msgSignup.innerText = 'Username is required.';
      msgSignup.style.color = 'rgb(218, 49, 49)';
      return false;
    }
  
    // Valider email
    const emailPatternSignup = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPatternSignup.test(emailSignup.value)) {
      msgSignup.innerText = 'Please enter a valid email address.';
      msgSignup.style.color = 'rgb(218, 49, 49)';
      return false;
    }
  
    // Valider mot de passe (8 caractères min, au moins 1 majuscule, 1 minuscule, 1 chiffre)
    const passwordPatternSignup = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPatternSignup.test(passwordSignup.value)) {
      msgSignup.innerText = 'Password must be at least 8 characters long, contain a lowercase, an uppercase letter, and a number.';
      msgSignup.style.color = 'rgb(218, 49, 49)';
      return false;
    }
  
    // Si toutes les validations passent
    msgSignup.innerText = 'Registration successful!';
    msgSignup.style.color = '#92ff92';
    return true;
  }

// Ajouter les événements nécessaires pour déplacer le bouton et afficher les messages
btnContainer.addEventListener('mouseenter', shiftButton); // Utilisation de 'mouseenter' pour éviter l'effet de répétition
btn.addEventListener('mouseenter', shiftButton);         // Même pour le bouton
uname.addEventListener('input', showMsg); // Vérifier quand l'utilisateur entre dans le champ 'Username'
email.addEventListener('input', showMsg); // Vérifier quand l'utilisateur entre dans le champ 'Email'
pass.addEventListener('input', showMsg); // Vérifier quand l'utilisateur entre dans le champ 'Password'
btn.addEventListener('touchstart', shiftButton);   // Pour les appareils tactiles
// Ajouter un écouteur d'événement au bouton d'inscription
registerBtnSignup.addEventListener('click', function () {
    if (validateSignupForm()) {
      // Action en cas de succès (ex. envoi des données, redirection, etc.)
      console.log('Sign Up Form is valid, proceeding...');
    }
  });