document.getElementById('createForm').addEventListener('submit', async e => {
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);
  
    const payload = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value
    };
  
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        location.href = '/dashboard';
      } else {
        const err = await res.json();
        alert(err.message || 'Erreur création de projet');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau');
    }
  });

