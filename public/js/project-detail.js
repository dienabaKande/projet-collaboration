window.addEventListener('load', async () => {
    const token = localStorage.getItem(tokenKey);
    if (!token) return location.href = '/login';
  
    const id = projectId; // injecté par EJS
  
    try {
      const res = await fetch(`/api/projects/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const p = await res.json();
      document.getElementById('projName').textContent = p.name;
  
      // Affichage des tâches
      const tasksSection = document.getElementById('tasks');
      p.tasks.forEach(t => {
        const item = document.createElement('div');
        item.innerHTML = `<p>${t.title} - ${t.status}</p>`;
        tasksSection.appendChild(item);
      });
  
      // À adapter : upload fichiers, historique, etc.
  
    } catch (err) {
      console.error(err);
      alert('Impossible de charger le projet');
    }
  });