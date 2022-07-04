const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

//Delete a user
exports.deletePost= (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('DELETE FROM status WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    });
  };