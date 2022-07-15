const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all friends in database 
exports.getAllfollow = (req, res) => {
   pool.query('SELECT * FROM users INNER JOIN follow ON users.id=follow.followid WHERE follow.followStatus=$1;',["pending"],(error, results)=>{

    if (error) {
        // if statement to catch errors if there's any
        throw error; // if error found, throw it
      }
      res.status(200).json(results.rows); // the results of the sql statement

  });
};

exports.Unfollow = (req, res) =>{
  pool.query('Delete FROM users INNER JOIN follow ON users.id=follow.followid WHERE follow.followStatus=$1;',["pending"],(error, results)=>{

    if (error) {
        // if statement to catch errors if there's any
        throw error; // if error found, throw it
      }
      res.status(200).json(results.rows); // the results of the sql statement

  });
}





//getting all the people who are following you
exports.getCountAllFollowers = (req,res) =>{
  pool.query('SELECT COUNT(*) FROM users INNER JOIN follow  ON users.id=follow.followid WHERE follow.followerStatus= $1;',["follower"],(error, results)=>{

    if (error) {
        // if statement to catch errors if there's any
        throw error; // if error found, throw it
      }
      res.status(200).json(results.rows); // the results of the sql statement
    })
};

//getting all the people who you are following 
exports.getCountAllFollowing = (req,res) =>{
  pool.query('SELECT COUNT(*) FROM users INNER JOIN follow ON users.id=follow.followid WHERE follow.followStatus=$1;',["pending"],(error, results)=>{

    if (error) {
        throw error; // if error found, throw it
      }
      res.status(200).json(results.rows); // the results of the sql statement
    })
};