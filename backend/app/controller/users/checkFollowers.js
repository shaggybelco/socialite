const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.getAll = async (req, res) => {
  //declare function & get params
  const id = req.params.id
  pool.query('SELECT follow FROM users WHERE id = $1',[id], (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};