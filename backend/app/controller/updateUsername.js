const client = require("../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updateUserName = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  client.query(
    "UPDATE users SET name = $1 WHERE id = $2",
    [name, id],
    (err, results) => {
      if (err) {
        res.status(400).json({ error: "wrong sql format" });
      }
      res.status(200).json({ message: `User updated with id ${id}` });
    }
  );
};
