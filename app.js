const express = require('express');
const cowsay = require('cowsay');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express()
const port = process.env.PORT || 3000;

dotenv.config();

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

//PUGLIFE
app.set('view engine', 'pug');
app.set('views', './views');

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const filmsRoutes = require('./routes/films.route');

//agrgado 28/07 rutas de paginas
const pagesRoutes = require('./routes/pages.route');
const userRoutes = require('./routes/user.route');
const favsRoutes = require('./routes/favs.routes');


app.use(express.json());

// Rutas
//API
app.use('/api/films', filmsRoutes);
app.use('/api', userRoutes);
app.use('/api/favorites', favsRoutes);
app.use('/', pagesRoutes);

// Gestionar ruta inexistente
app.use(error404);

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "tux", // Use the tux ASCII art // tux
    })
  );
});