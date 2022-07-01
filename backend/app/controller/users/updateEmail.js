const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updateEmail = (req, res) => {
  const id = parseInt(req.params.id);
  const { email } = req.body;

  pool.query(
    "UPDATE users SET email = $1 WHERE id = $2",
    [email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};