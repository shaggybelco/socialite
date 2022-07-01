const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const { register } = require("../Controller/users/register");
const { login } = require("../Controller/users/login");

const { getAllUsers } = require("../Controller/users/getAllUsers");
const { getOneUser } = require("../Controller/users/getOneUser");
const { updateUser } = require("../Controller/users/updateUsers");
const { updatePassword } = require("../Controller/users/updatePassword");
const { deleteUser } = require("../Controller/users/deleteUser");
const { updateEmail } = require("../Controller/users/updateEmail");
const { updateName } = require("../Controller/users/updateName");

app.post("/register", register); // Post request to register the users
app.post("/login", login); //Post to login users

app.get("/get", getAllUsers); // get all existing users
app.get("/getone/:id", getOneUser); //get single user

app.put("/updateUser/:id", updateUser); // update all details of user
app.put("/updateName/:id", updateName); //update the name of user
app.put("/updatePassword/:id", updatePassword); // update user password for login
app.put("/updateEmail/:id", updateEmail); // update user email for login

app.delete("/deleteUser/:id", deleteUser); // delete a user



module.exports = app;
