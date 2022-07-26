// const pool = require("../../config/database");
// const express = require("express");
// const app = express();
// const bodyparser = require('body-parser')


// //Get all users in database
// exports.suggestedUsers = (req, res) => {
//   //declare variable to store form data
//   const id = parseInt(req.params.id);

//   //declare function & get params
//   pool.query('SELECT users.id, users.name, follow.userid, follow.followid, follow.followstatus FROM users Full outer JOIN follow ON users.id=follow.followid AND follow.followStatus = $1 WHERE users.id <> $2',
//   ['pending',id],
//   (error, results) => {
//     // sequiliaze to get all userrs from the table
//     if (error) {
//       // if statement to catch errors if there's any
//       throw error; // if error found, throw it
//     }
//     res.status(200).json(results.rows); // the results of the sql statement
//   });
// };

const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.suggestedUsers = (req, res) => {
  //declare variable to store form data
  const id = parseInt(req.params.id);


  //declare function & get params
//   pool.query('select users.id, users.name from users left join follow on users.id = follow.followid where follow.userid is null AND users.id <> $1',
//   [id],
//   (error, results) => {
//     // sequiliaze to get all userrs from the table
//     if (error) {
//       // if statement to catch errors if there's any
//       throw error; // if error found, throw it
//     }
//     res.status(200).json(results.rows); // the results of the sql statement
//   });
// };

 //declare function & get params
  pool.query('select *  from users where id <> $1',
  [id],
  (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};