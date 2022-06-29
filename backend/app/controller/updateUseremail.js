const client = require("../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updateUseremail = (req, res) => {
  const id = parseInt(req.params.id);
  const { email } = req.body;

  con.query(
    "UPDATE users SET email = $1 WHERE id = $2",
    [email, id],
    (err, results) => {
      if (err) {
        res.status(400).json({ error: "wrong sql format" });
      }
      res.status(200).json({ message: `User updated with id ${id}` });
    }
  );
};