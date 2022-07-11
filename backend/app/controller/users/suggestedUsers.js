const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.suggestedUsers = (req, res) => {
  //declare function & get params
  pool.query('SELECT * FROM users INNER JOIN follow  ON users.userid=follow.userid WHERE follow.followStatus != $1',["Following"], (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};