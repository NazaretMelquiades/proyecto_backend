# 🎬 Proyecto Backend: Movie app
Este proyecto consiste en una aplicación web para la búsqueda, visualización y gestión de películas, desarrollada como proyecto final de backend del bootcamp de desarrollo web full stack.
Cuenta con funcionalidades diferenciadas según el rol del usuario (Usuario o Administrador) y permite realizar operaciones CRUD sobre películas, así como gestionar una lista de películas favoritas.
Además, implementa autenticación mediante JWT y OAuth.

## 🛠️ Tecnologías usadas
- HTML5 / CSS3
- JavaScript (ES6+)
- Node.js + Express
- PostgreSQL
- MongoDB
- Pug (SSR)
- OMDB API
- JWT & OAuth (Login)
- Git + GitHub

## 🎯 Objetivo del proyecto
- Crear una aplicación web full stack funcional para gestionar películas.
- Aplicar buenas prácticas de seguridad, organización de código y arquitectura MVC.
- Implementar SSR, persistencia de datos en SQL y MongoDB, y llamadas a API externa.
- Gestionar autenticación y autorización por roles (Usuario y Administrador).
- Aplicar metodología ágil (SCRUM).
- Documentar el backend con Swagger y JSDoc.

## 🧩 Funcionalidades principales
- Registro y login con JWT y OAuth (Google, GitHub, etc.)
- Panel de control diferenciado por rol
- Buscador de películas que consulta primero OMDB y luego MongoDB
- Vista detalle de película con scraping de opiniones reales
- Añadir y quitar películas favoritas
- CRUD de películas (solo para Administrador)
- CRUD de usuarios (solo para Administrador)
- Recuperación y restauración de contraseña por JWT

## 📸 Capturas de pantalla
(Agrega aquí tus capturas de pantalla cuando las tengas listas)

## 🚀 Cómo ejecutar el proyecto
1. Clonar el repositorio de GitHub
git clone

    https://github.com/NazaretMelquiades/proyecto_backend

2. Instalar dependencias -> npm install

3. Crear un archivo .env con tus claves:

4. Iniciar servidor -> npm start

5. Acceder a la app en http://localhost:3000

## 🌐 Proyecto desplegado
Puedes ver el proyecto online en:
https://proyecto-movies.render.com (actualiza esta URL si tienes despliegue)

## 📚 Lecciones aprendidas
- Integrar múltiples fuentes de datos sin duplicar información (API y MongoDB)
- Autenticación segura con JWT y login social
- Uso avanzado de Express y middlewares para proteger rutas
- Trabajo colaborativo con GitHub: ramas, PRs y conflictos
- Planificación de tareas y sprints con SCRUM

## 🔧 Funcionalidades futuras
- 

## 📂 Estructura del proyecto
```js
├── config/             // Conexión a PostreSQL Y MongoDB    
├── controllers/        // Controladores de lógica de negocio
├── middlewares/        // Operaciones intermedias
├── models/             // Modelos SQL y MongoDB
├── routes/             // Rutas de la API y vistas
├── views/              // Plantillas EJS o Pug
├── public/             // Archivos estáticos (CSS, JS)
├── queries/            // Queries parametrizadas 
├── services            // Servicios MongoDB
├── tests/              // Tests unitarios 
├── utils/              // Funciones auxiliares
├── views/              // Vistas dinámicas con Pug
├── app.js              // Archivo principal del servidor
└── README.md
```

 ## 🧑‍💻 Autores
- Miguel Ángel Jiménez 
- María Laura Smichowski
- Fernán Alfonso Burgos
- María de Nazaret Melquiades





