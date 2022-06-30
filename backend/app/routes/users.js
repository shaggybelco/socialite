const express = require("express");
const app = express();
const bodyparser = require('body-parser')

const {register} = require("../controller/register");
const {login} = require("../controller/login");

const{getAllUsers} = require("../controller/getAllUsers");
const{getOneUser} = require("../controller/getOneUser");
const{updateUser} = require("../controller/updateUsers");
const{updatePassword} = require("../controller/updatePassword");
const{updateUseremail} = require("../controller/updateUseremail");
// const{updateUsername} = require("../controller/updateUsername");
const{deleteUser} = require("../controller/deleteUser");

app.post("/register", register);  // Post request to register the users
app.post("/login", login); //Post to login users

app.get('/users',getAllUsers) // get all existing users
app.get('/users/:id',getOneUser); //get single user

app.put('/users/:id',updateUser) 
app.put('/users/:id', updatePassword);
app.put('/users/:id', updateUseremail);
// app.put('/users/:id', updateUsername);

app.delete('/users/:id',deleteUser) // delete a user

module.exports = app;