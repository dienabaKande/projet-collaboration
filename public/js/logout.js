// Assurez-vous que ce fichier est bien lié à la page contenant le bouton de déconnexion
document.getElementById('logout-btn').addEventListener('click', function() {
    // Supprimer le token de localStorage
    localStorage.removeItem('token');
    
    // Rediriger vers la page de connexion
    window.location.href = '/login';  // Redirection vers la page de connexion
  });
  