const jwt = require('jsonwebtoken');
const User = require('./models/user');
require("dotenv/config")
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_PASSWORD);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();

  }
   catch (error) {
    res.status(401).send({ error: 'No autorizado' });
  }
};

module.export = authMiddleware