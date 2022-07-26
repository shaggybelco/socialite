const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.getAllUsers = async (req, res, next) => {
  //declare function & get params
  //const id = parseInt(req.params.id)
  try{
   await pool.query('SELECT * FROM users WHERE id <> $1 ORDER BY id ASC', (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      return next(error); // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
}catch(error){
  res.status(500).json({error: "database error"});
}
};