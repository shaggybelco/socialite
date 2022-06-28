const bcrypt = require("bcrypt");

const client = require("../config/database");

const jwt = require("jsonwebtoken");

//Login Function

exports.login = async (req, res) => {
     const { email, password } = req.body;
    
     try{
      const data = await client.query(`SELECT * FROM users WHERE email= $1;` , [email]); //Veryfying if the user exists in the database
      
      const user = data.rows;
     
     if(user.length == 0){
       res.status(400).json({
          error: "User is not registerd, Sign Up",
     });

 }else {
      bcrypt.compare(password, user[0].password, (err, results) => { // Comparing the hashed password
           if (err) {
              res.status(500).json({
                    error: "Server Error",
           });
            
     } else if (results === true) { //Checking if the credentials match

        const  token = jwt.sign(
        {
         email: email,
        },

 process.env.SECRET_KEY
   );
      
res.status(200).json({
  message: "User signed in!",
  token: token,
});
     }
   else {
     //Declaring the errors
     if (results != true){
      res.status(400).json({
      error: "Enter correct password",
      
   });
}}
})
}
} catch (err) {
console.log(err);
res.status(500).json({
error: "Database error occurred while signing in!", //Database connection error
});
};
};