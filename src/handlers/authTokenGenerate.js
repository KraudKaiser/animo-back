const jwt = require('jsonwebtoken')
require("dotenv/config")
const jwtSecret = process.env.SECRET_TOKEN_PASSWORD
function generateAuthToken(userId) {
  const token = jwt.sign({ userId }, jwtSecret)

  return token
}

module.exports = generateAuthToken
