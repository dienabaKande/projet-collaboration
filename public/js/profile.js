// public/js/profile.js
window.addEventListener('load', async () => {
    const token = localStorage.getItem(tokenKey);
    if (!token) return location.href = '/login';
  
    try {
      const res = await fetch('/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const user = await res.json();
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
    } catch (err) {
      console.error(err);
      alert('Impossible de charger le profil');
    }
  });
  
  document.getElementById('profileForm').addEventListener('submit', async e => {
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);
    try {
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: document.getElementById('name').value })
      });
      if (res.ok) {
        alert('Profil mis à jour');
      } else {
        const err = await res.json();
        alert(err.message || 'Erreur mise à jour');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau');
    }
  });