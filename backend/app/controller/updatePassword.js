const client = require("../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updatePassword = (req, res) => {
    const id = parseInt(req.params.id);
    const { password} = req.body;
  
    client.query(
      'UPDATE users SET password  = $1 WHERE id = $2',
      [password, id],
      (error, results) => {
        const name = client.query('SELECT name = $1 FROM users WHERE id =$2',[id]);
        if (error) {
          throw error;
        }
        res.status(200).send(`User ${name} modified with ID: ${id}`);
      }
    );
  };