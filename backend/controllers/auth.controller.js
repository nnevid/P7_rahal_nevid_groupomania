const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: process.cwd() + "/config/.env" });

// Error handler
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", pseudo: "" };
   
  //Mail, password & pseudo incorrects
  if(err.messsages === `Le email est incorrect`){
   errors.email = `Cet email est incorrect`
}   
  if(err.messsages === `Le mot de passe est incorrect`){
   errors.password = `Le mot de passe est incorrect`
}   
  if(err.messsages === `Ce pseudo n'est pas disponible`){
   errors.pseudo = `Ce pseudo n'est pas disponible`
}   
  // duplicate error code
   if (err.code === 11000){
      errors.email = `Cet email est déjà enregistré`;
      return errors;
   }
   //validation errors   
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

// Sign Up
exports.signUp = async (req, res) => {
  const { email, password, pseudo } = req.body;
  try {
    const user = await User.create({ email, password, pseudo });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// Log In 

exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id})
  } catch (err){
   const errors = handleErrors(err);
      res.status(400).json({ errors })
  }
};

// Log Out  
exports.logOut = (req, res) => {
res.cookie('jwt', '', {maxAge: 1});
return res.json({
   success: true,
   message: `Déconnexion réussie`
})
// res.redirect('/');

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

// const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user)
//     return res.json({
//       success: false,
//       message: "user not found with this mail",
//     });

//     let validPassword = bcrypt.compareSync(req.body.password, user.password)
//     if (validPassword == false) {
//       return res.json({
//         success: false,
//         message: "email / password does not match",
//        });
//       }

//       const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

//        const userMail = { email: user.email };
//        res.json({
//          success: true,
//          mail: userMail,

//        });

//        let oldTokens = user.tokens || [];
//        if (oldTokens.length) {
//          oldTokens = oldTokens.filter((t) => {
//            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
//            if (timeDiff < 86400) {
//              return t;
//            }
//          });
//        }
//        await User.findByIdAndUpdate(user._id, {
//          tokens: [...oldTokens, { token, signedAt: Date.now().toString }],
//        })
