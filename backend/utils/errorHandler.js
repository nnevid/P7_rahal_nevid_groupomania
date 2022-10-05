// Error handler
const handleErrors = (err) => {
   console.log(err.message, err.code);
   let errors = { email: "", password: "", pseudo: "" };
    
   //Mail, password incorrects
   if(err.messsage === "email incorrect"){
    errors.email = `Cet email est incorrect`;
 }   
   if(err.messsage === "mot de passe incorrect"){
      errors.password = `Le mot de passe est incorrect`;
    
 }   
  
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

const uploadError = (err) =>{
   let errors = {format:'', maxSize:''}
   if(err.message.includes('fichier invalide'))
   errors.format = 'Format non valide';
   if(err.message.includes('max size'))
   errors.maxSize= `La taille de l'image ne doit pas dépsser les 500Ko`
   return errors
}


 module.exports = {handleErrors, uploadError};