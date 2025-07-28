// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");
//   const input = document.querySelector("input[name='q']");
//   const resultsContainer = document.querySelector("#results");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const title = input.value.trim();
//     if (!title) return;

//     resultsContainer.innerHTML = "<p>Searching...</p>";

//     try {
//       // Buscar en API
//       const resApi = await fetch(`/api/movie/${encodeURIComponent(title)}`);
//       const dataApi = await resApi.json();

//       if (dataApi && dataApi.length > 0) {
//         renderMovies(dataApi, "api");
//       } else {
//         //Si no en Mongo
//         const resMongo = await fetch(`/api/mongo/${encodeURIComponent(title)}`);
//         const dataMongo = await resMongo.json();

//         if (dataMongo && dataMongo.length > 0) {
//           renderMovies(dataMongo, "mongo");
//         } else {
//           resultsContainer.innerHTML = "<p>No movies found.</p>";
//         }
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       resultsContainer.innerHTML = "<p>Error.</p>";
//     }
//   });

//   //Renderizar pelis
//   function renderMovies(movies, source) {
//     resultsContainer.innerHTML = `<h2>Results (${source === "api" ? "API" : "MongoDB"})</h2>`;
//     movies.forEach((film) => {
//       const card = document.createElement("div");
//       card.classList.add("film");

//       card.innerHTML = `
//         <h3>${film.title}</h3>
//         <img src="${film.poster}" alt="${film.title}" width="150" />
//         <p>Year: ${film.year}</p>
//         <p>Director: ${film.director}</p>
//         <p>Genre: ${film.genre}</p>
//         <p>Runtime: ${film.runtime} min</p>

//         <form action="/favorites" method="POST">
//           <input type="hidden" name="filmId" value="${film.id || film._id}" />
//           <button type="submit">Add to favorites</button>
//         </form>
//       `;

//       resultsContainer.appendChild(card);
//     });
//   }
// });