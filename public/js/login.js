document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Empêcher le rechargement de la page lors de la soumission du formulaire

    // Récupérer les données du formulaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Créer un objet de données à envoyer au backend
    const data = { email, password };

    // Effectuer la requête AJAX (fetch API)
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Si la connexion est réussie, rediriger l'utilisateur ou stocker le token
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';  // Rediriger vers une page de tableau de bord par exemple
        } else {
            // Afficher un message d'erreur en cas de problème
            document.getElementById('error-message').innerText = data.message || 'Erreur de connexion.';
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('error-message').innerText = 'Une erreur est survenue. Veuillez réessayer.';
    });
});
