const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updatePassword = (req, res) => {
    const id = parseInt(req.params.id);
    const { password} = req.body;
  
    pool.query(
      'UPDATE users SET password  = $1 WHERE id = $2',
      [password, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User modified with ID: ${id}`);
      }
    );
  };