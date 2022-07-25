const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.checkFollow = async (req, res) => {
  //declare function & get params
  const id = parseInt(req.params.id);
  const followid = parseInt(req.params.followid);
  
  pool.query('SELECT * FROM follow WHERE userid = $1 and followid = $2',[id, followid], (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};