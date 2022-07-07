const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get a single user by ID
exports.getUserPosts = (req, res) => {
  //declare function & get params
  const id = parseInt(req.params.id); // declare a variable that will use to locate each user

  pool.query('SELECT * FROM status s, users u WHERE s.userid = $1 AND u.id = s.userid ORDER BY date ', [id], (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};