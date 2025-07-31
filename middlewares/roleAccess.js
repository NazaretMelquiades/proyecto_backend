const jwt = require('jsonwebtoken');

function setRole(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      res.locals.role = decoded.role;
      req.user = decoded; // opcional: por si lo quieres en la ruta
    } catch {
      res.locals.role = null;
    }
  } else {
    res.locals.role = null;
  }
  next();
}

module.exports = setRole;