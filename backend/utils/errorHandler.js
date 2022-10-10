// Error handler
module.exports.handleErrors = (err) => {
   // console.log(err.message, err.code);
   let errors = { email: "", password: "", pseudo: "" };
    
  if(err.message.includes('pseudo'))
  errors.pseudo = 'Ce pseudo est déjà utilisé'
  if(err.message.includes('mot'))
  errors.password = 'Le mot de passe est incorrect'
  if(err.message.includes('email'))
  errors.email = 'Cet email est incorrect'
 //   duplicate error code
    if (err.code === 11000){
       errors.email = `Cet email est déjà enregistré`;
       return errors;
    }
    //validation errors   
   if (err.message.includes("User validation failed" || "email incorrect" || "mot de passe incorrect")) {
     Object.values(err.errors).forEach(({ properties }) => {
       errors[properties.path] = properties.message;
     });
   }
   return errors;
 };

module.exports.uploadError = (err) =>{
   let errors = {format:'', maxSize:''}
   if(err.message.includes('fichier invalide'))
   errors.format = 'Format non valide';
   if(err.message.includes('max size'))
   errors.maxSize= `La taille de l'image ne doit pas dépsser les 500Ko`
   return errors
}


