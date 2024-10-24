// Script JavaScript pour gérer les modaux
function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fermer le modal si l'utilisateur clique en dehors du contenu
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
