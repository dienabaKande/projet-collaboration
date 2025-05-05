window.addEventListener('load', async () => {
    const token = localStorage.getItem(tokenKey);
    if (!token) return location.href = '/login';
  
    try {
      const res = await fetch('/api/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const projets = await res.json();
      const list = document.getElementById('projectList');
      projets.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
          <h2>${p.name}</h2>
          <p>${p.status}</p>
          <a href="/projects/${p._id}">Voir détails</a>
        `;
        list.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      alert('Impossible de charger les projets');
    }
  
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem(tokenKey);
      location.href = '/login';
    });
  });