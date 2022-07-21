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
  };