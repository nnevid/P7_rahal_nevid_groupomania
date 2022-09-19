const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      
    }
  )
  .then(() => console.log("connection à Mongo DB réussie!"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));
