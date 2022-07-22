const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.followers = (req, res) => {
  //declare function & get params
  const id = parseInt(req.params.id)
  pool.query('SELECT count(id) FROM(SELECT *, generate_subscripts(follow, 1) AS s FROM users) AS foo WHERE follow[s] = $1;',[id], (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};