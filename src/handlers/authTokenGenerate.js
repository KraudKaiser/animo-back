const jwt = require('jsonwebtoken');
require("dotenv/config")
// Definir una clave secreta para la firma del token de autenticación
const jwtSecret = process.env.SECRET_TOKEN_PASSWORD;
// Función para generar un token de autenticación para un usuario específico
function generateAuthToken(userId) {
  // Generar el token de autenticación con el ID de usuario como datos del payload
  const token = jwt.sign({ userId }, jwtSecret);

  return token;
}

module.exports = generateAuthToken
