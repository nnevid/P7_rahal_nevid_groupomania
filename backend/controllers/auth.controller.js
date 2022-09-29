const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.signup = (req, res, next) =>  {
   bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
               pseudo: req.body.pseudo,
               email: req.body.email,
               password: hash
            })
            user.save()
                .then(() => res.status(201).json({ user: user._id }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))


}

// User login
exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ error: 'Id/password does not match' })
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ error: 'Id/password does not match' })
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                           { userId: user._id },
                           `${process.env.SECRET_KEY}`
                           
                       )
                   })
               })
               .catch(error => res.status(500).json({ error }))
       })
       .catch(error => res.status(500).json({ error }))
}





