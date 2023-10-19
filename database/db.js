const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://CIPEMCIPEM:CIPEM@clpem.j0gjlgy.mongodb.net/Task_Management?retryWrites=true&w=majority';
const options = {useNewUrlParser : true,
useUnifiedTopology: true,};
mongoose 
     .connect(mongoURI,options)
     .then(
        ()=>{console.log('connected  to MongoDB');}
     )
     .catch((error)=>{
        console.error('Error connecting to MongoDB',error);
     }

     )
