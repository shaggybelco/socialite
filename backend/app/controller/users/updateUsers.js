const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password} = req.body;
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, password  = $3 WHERE id = $4',
      [name, email, password, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User ${name} modified with ID: ${id}`);
      }
    );
  };