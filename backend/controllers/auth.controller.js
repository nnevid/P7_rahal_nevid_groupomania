const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validate } = require("../models/User");
const User = require("../models/User");


// Sign Up
exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
      });
     
      user
        .save()
        .then(() => res.status(201).json({ user: user._id, msg: `Compte crée avec succès!` }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


// Log In creates array with token in DB
exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      success: false,
      message: "user not found with this mail",
    });
   
    let validPassword = bcrypt.compareSync(req.body.password, user.password)
    if (validPassword == false) {
      return res.json({
        success: false,
        message: "email / password does not match",
       });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
     
       const userMail = { email: user.email };
       res.json({
         success: true,
         mail: userMail,
         
       });
       
       let oldTokens = user.tokens || [];
       if (oldTokens.length) {
         oldTokens = oldTokens.filter((t) => {
           const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
           if (timeDiff < 86400) {
             return t;
           }
         });
       }
       await User.findByIdAndUpdate(user._id, {
         tokens: [...oldTokens, { token, signedAt: Date.now().toString }],
       })
   }
 
exports.logOut =  (req, res) => {


};


// if(req.headers && req.headers.authorization){
//    const token = req.headers.authorization.split(' ')[1]
//    if(!token){
//       return res.status(401).json({success: false, message: 'Authorization failed!'})
//    }
//    const tokens = req.user.tokens;
//    const newTokens = tokens.filter(t => t !== token)
//    await User.findByIdAndUpdate(req.user._id, {tokens: newTokens})
//    res.json({success: true, msg: 'Sign out successfully 🔚'})
//  }