const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

//Delete a user
exports.deletePost= (req, res) => {
    // const id = parseInt(req.params.id);
    const {postid, id} = req.body
  
    pool.query('DELETE FROM images WHERE id = $1 and userid = $2', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User deleted with ID: ${id}`);
    });
  };