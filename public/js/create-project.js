document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('authToken');
  const messageDiv = document.getElementById('message');
  const form = document.getElementById('create-project-form');
  const loginButton = document.getElementById('login-button');

  if (token) {
      // L'utilisateur est connecté, afficher le formulaire
      form.style.display = 'block';
      loginButton.style.display = 'none'; // Cacher le bouton de connexion
  } else {
      // L'utilisateur n'est pas connecté, afficher un message
      messageDiv.innerHTML = 'Veuillez vous connecter pour créer un projet.';
      form.style.display = 'none'; // Cacher le formulaire
      loginButton.style.display = 'block'; // Afficher le bouton de connexion
  }

  // Gérer la soumission du formulaire
  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;

      try {
          const response = await fetch('/api/projects/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` // Envoyer le token JWT
              },
              body: JSON.stringify({ title, description })
          });

          const data = await response.json();
          if (response.status === 201) {
              alert('Projet créé avec succès!');
              window.location.href = '/my-projects.html'; // Rediriger vers la page des projets
          } else {
              alert(data.message);
          }
      } catch (error) {
          console.error('Erreur:', error);
          alert('Une erreur est survenue lors de la création du projet.');
      }
  });
});

// Rediriger vers la page de connexion
function redirectToLogin() {
  window.location.href = '/login.ejs'; // Remplace par la page de connexion appropriée
}


