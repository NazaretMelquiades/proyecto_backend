
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        // Redirigimos al login
        window.location.href = '/login';
      } else {
        const err = await res.json();
        alert(err.message || 'Error creating user');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  });

