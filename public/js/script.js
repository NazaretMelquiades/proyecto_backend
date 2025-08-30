const loginbtn = document.getElementById('loginForm');

if (loginbtn) {
  loginbtn.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } else {
      const err = await res.json();
      alert(err.message || 'Login failed');
    }
  });
};

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {

  logoutBtn.addEventListener('click', async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    window.location.href = data.redirect;
  });
};


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const results = document.getElementById("results");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); //Para que no se recarge la pag

      const query = input.value.trim(); //eliminar espacios
      if (!query) {
        results.innerHTML = "<p>Search for a title.</p>";
        return;
      }

      try {                                       //Petición GET al back con el titulo codificado
        const response = await fetch(`/api/films?Title=${encodeURIComponent(query)}`);
        if (!response.ok) {
          results.innerHTML = `<p style="color: red;">No movies found</p>`;
          return;
        }

        const data = await response.json(); //convertir la resp json en obj o arr

        // Si es un array y esta vacio no movies found
        if (Array.isArray(data) && data.length === 0) {
          results.innerHTML = `<p style="color: red;">No movies found</p>`;
          return;
        }

        // Si es un array con resultados los muestra
        if (Array.isArray(data)) {
          results.innerHTML = data.map(film => `
          <div class="film-card">
            <h2>${film.Title}</h2>
            <p><strong>Year:</strong> ${film.Year || "Unknown"}</p>
            <p><strong>Director:</strong> ${film.Director || "Unknown"}</p>
            <p><strong>Genre:</strong> ${film.Genre || "Unknown"}</p>
            <p><strong>RunTime:</strong> ${film.Runtime || "Unknown"}</p>
            <img src="${film.Poster}" alt="Poster" style="max-width:200px"/>
          </div>
        `).join(''); // Combina todos los bloques en una sola cadena
          return;
        }

        // Si es un objeto de la API mostrarlo
        results.innerHTML = `
        <div class="film-card">
          <h2>${data.Title}</h2>
          <p><strong>Year:</strong> ${data.Year || "Unknown"}</p>
          <p><strong>Director:</strong> ${data.Director || "Unknown"}</p>
          <p><strong>Genre:</strong> ${data.Genre || "Unknown"}</p>
          <p><strong>RunTime:</strong> ${data.Runtime || "Unknown"}</p>
          <img src="${data.Poster}" alt="Poster" style="max-width:200px"/>
        </div>
      `;
      } catch (error) {
        results.innerHTML = `<p style="color: red;">No movies found</p>`;
        console.error("Error:", error);
      }
    });
  }
});

const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
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
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('films-container');
  if (container) {

    try {
      const res = await fetch(`/api/favorites/${userId}`);
      if (!res.ok) throw new Error('Error fetching favorites');

      const json = await res.json();
      const favorites = json.data; // <- ¡aquí está el cambio!

      if (!favorites.length) {
        container.innerHTML = "<p>You don't have favorites yet.</p>";
        return;
      }

      container.innerHTML = ""; // limpiar mensaje

      favorites.forEach(fav => {
        const filmDiv = document.createElement('div');
        filmDiv.classList.add('film');

        filmDiv.innerHTML = `
        <h3>${fav.title}</h3>
        <img src="${fav.poster}" alt="${fav.title}" width="150">
        <p>Year: ${fav.year}</p>
        <p>Director: ${fav.director}</p>
        <p>Genre: ${fav.genre}</p>
        <p>Runtime: ${fav.runtime} min</p>
      `;

        container.appendChild(filmDiv);
      });

    } catch (err) {
      console.error(err);
      container.innerHTML = "<p>Error loading favorites.</p>";
    }
  }
});