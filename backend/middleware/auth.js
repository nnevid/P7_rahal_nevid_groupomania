const jwt = require('jsonwebtoken')
require('dotenv').config({ path: process.cwd() + '/.env' })

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`)
        const userId = decodedToken.userId
        req.auth = {
         userId: userId
     };
     req.user = user;
      next();
    } catch (error) {
        res.status(401).json({ error });
    }
}