const express = require("express"); // import express library
const cors = require("cors"); //import cors module
const app = express(); //Initialize express

require("./app/config/dotevn"); //Import your environmental configs

const user = require("./app/routes/users");
const news = require("./app/routes/newsfeed");

const client = require("./app/config/database");


app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5050;

const hostURL = '0.0.0.0'; //Fault-Tolerant listening port for Backend. Picks available dynamic IPv4 and IPv6 addresses of the local host

client.connect((error) =>{ // Connect to the Database
   if (error) {
     }
  else {
    console.log("Data logging initialised");
   }

});

app.get("/", (request, response) =>{
    response.status(200).send("Sever Initialized and Online. Ready to take OFF!");
});

app.use("/user", user); // User endpoint API
app.use('/news', news);

app.listen(port, process.env.baseURL , () =>{  
   console.log(`Here we go, All Engines started at ${port}.`) 
})


