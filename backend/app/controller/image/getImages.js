const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get a single user by ID
exports.getUserImage = (req, res) => {
  //declare function & get params
  const id = parseInt(req.params.id); // declare a variable that will use to locate each user

  pool.query('SELECT u.name,u.id, i.id, i.userid,i.image, i.caption, i.date FROM images i, users u WHERE i.userid = $1 AND u.id = i.userid ORDER BY i.id DESC', [id], (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};