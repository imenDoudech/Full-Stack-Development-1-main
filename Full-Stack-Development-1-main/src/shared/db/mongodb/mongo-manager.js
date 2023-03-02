const mongoose = require('mongoose');

require('dotenv').config()




const openMongoConnection = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("connected to MongoDB");
    });
    mongoose.connect(process.env.MONGO_URI);
   

};

mongoose.set('strictQuery', true) 


  
  //Création d'une collection de donnée dans ma base
  const creationCollection = (collectionName) =>{
  
    let collections = db.collections;
    let names = [];
    
    Object.entries(collections).forEach(function(key, index, arr) {
        names.push(arr);
        
    });
    
    console.log(names);
  
    //Vérifier si la collection existe déja
    for (let i=0; i< names.length; i++){
      if (collectionName != names[i]){
        db.createCollection(collectionName);
        console.log("collection cree !")
   
      }else 
      console.log("collection existante !")
  
    }
      

    };

    
   
  
  
  
  
  
  
  mongoose.set("strictQuery", true);

module.exports = {openMongoConnection, creationCollection};
