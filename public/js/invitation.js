document.getElementById('inviteForm').addEventListener('submit', async e => {
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);
    const email = document.getElementById('emailInvite').value;
  
    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        loadHistory();
      } else {
        const err = await res.json();
        alert(err.message || 'Erreur envoi invitation');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau');
    }
  });
  
  async function loadHistory() {
    const token = localStorage.getItem(tokenKey);
    try {
      const res = await fetch('/api/invitations', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const inv = await res.json();
      const sec = document.getElementById('history');
      sec.innerHTML = '';
      inv.forEach(i => {
        const p = document.createElement('p');
        p.textContent = `${i.email} - ${i.status}`;
        sec.appendChild(p);
      });
    } catch (err) {
      console.error(err);
      alert('Impossible de charger les invitations');
    }
  }
  
  window.addEventListener('load', loadHistory);