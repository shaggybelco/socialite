const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.unfollow = (req, res) => {
    const { id, userid} = req.body;
  
    pool.query(
      'update users set follow = array_remove(follow, $1) where id = $2;',
      [userid, parseInt(id)],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User ${userid} modified with ID: ${id}`);
      }
    );

      //This Will Only Work For NewsFeed

      pool.query(
        'DELETE FROM follow  WHERE userid = $1 AND followid = $2;',
        [id,userid],
        (err) => {
            if (err) {
                flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                console.error(err);
                return res.status(500).json({
                    error: "Database error",
                });
            } else {
                flag = 1;
               
            }
        }
    );

  

      //End here


  };