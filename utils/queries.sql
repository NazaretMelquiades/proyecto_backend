--TABLE USERS:
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user', -- 'user' o 'admin'
  logged BOOLEAN DEFAULT 'false' NOT NULL
);

--TABLE FAVORITES:
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  movie_id VARCHAR(100) NOT NULL,
  source VARCHAR(10) NOT NULL CHECK (source IN ('omdb', 'mongo')),
  UNIQUE (user_id, movie_id, source)
);

--INSERTAR DATOS PRUEBA :
-- USUARIO NORMAL:
INSERT INTO users (username, email, password, role, logged)
VALUES ('alexuser', 'alex.user@example.com', 'hashedpassword1', 'user', false);

-- ADMINISTRADOR:
INSERT INTO users (username, email, password, role, logged)
VALUES ('alexadmin', 'alex.admin@example.com', 'hashedpassword2', 'admin', false);

-- USUSARIO ALEXUSER (ID 1) AÑADE 1 PELI:
INSERT INTO favorites (user_id, movie_id, source)
VALUES 
(1, 'tt0111161', 'omdb') --The Shawshank Redemption

-- ADMIN ALEXADMIN (ID 2) AÑADE UNA PELI
INSERT INTO favorites (user_id, movie_id, source)
VALUES (2, 'tt0068646', 'omdb'); --The Godfather

--CONSULTA PARA COMPROBAR DATOS:
-- SELECT u.username, f.movie_id, f.source
-- FROM favorites f
-- JOIN users u ON f.user_id = u.id;

--CONSULTA FAVORITOS POR USER_ID:
-- SELECT 
--   f.id AS favorite_id,
--   f.movie_id,
--   f.source
-- FROM favorites f
-- WHERE f.user_id = 1;

--CREAR USUARIO SIGNUP:
INSERT INTO users (username, email, password, role, logged)
VALUES ($1, $2, $3, 'user', false);

--OBTENER USUARIO POR EMAIL PARA LOGIN:
SELECT * FROM users WHERE email = $1;

--SELECT ALL FROM USER
SELECT * FROM users;

--OBTENER PERFIL POR ID PARA /API/USER:
SELECT id, username, email, role FROM users WHERE id = $1;

--ACTUALIZAR PERFIL USER:
UPDATE users
SET username = $1, email = $2, password = $3
WHERE id = $4;

--ELIMINAR USUARIO (SOLO PUEDE EL ADMIN):
DELETE FROM users WHERE email = $1

--LISTAR TODOS LOS USERS, ADMIN EN /USERS:
SELECT id, username, email, role FROM users;

--OBTENER TODOS LOS FAVORITOS DE UN USER:
SELECT movie_id, source
FROM favorites
WHERE user_id = $1;

--DELETE UN FAVORITO:
DELETE FROM favorites
WHERE user_id = $1 AND movie_id = $2 AND source = $3;

--logIn:
UPDATE user 
SET logged = true
WHERE email =$1;

--logOut: `
UPDATE user
SET logged = false
WHERE email =$1;