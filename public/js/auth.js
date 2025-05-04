const tokenKey = 'token';

async function handleAuth(e, url, data) {
  e.preventDefault();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (res.ok) {
      localStorage.setItem(tokenKey, json.token);
      window.location.href = '/dashboard';
    } else {
      alert(json.message || 'Erreur lors de l\u2019authentification');
    }
  } catch (err) {
    console.error(err);
    alert('Erreur réseau');
  }
}

document.getElementById('loginForm')?.addEventListener('submit', e => {
  handleAuth(e, '/api/auth/login', {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  });
});

document.getElementById('registerForm')?.addEventListener('submit', e => {
  handleAuth(e, '/api/auth/register', {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  });

  // public/js/auth.js
(function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Veuillez vous connecter d’abord.');
    window.location.href = '/login';
  }
})();

});