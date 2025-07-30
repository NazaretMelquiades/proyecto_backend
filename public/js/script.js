document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const results = document.getElementById("results");

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
});

