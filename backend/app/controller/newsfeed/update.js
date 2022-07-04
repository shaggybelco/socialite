const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

exports.updatePost = (req, res) => {
  const id = parseInt(req.params.id);
  const { message } = req.body;

  pool.query(
    "UPDATE status SET message = $1 WHERE id = $2",
    [message, id],
    (error) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};
