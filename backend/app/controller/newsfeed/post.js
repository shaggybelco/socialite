const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

exports.createStatus = (req, res) => {
  const { userid, message } = req.body;

  var date = new Date().getDate().toLocaleString();

  pool.query(
    `INSERT INTO status (userid, message, date) VALUES ($1,$2,$3);`,
    [userid, message, date],
    (err) => {
      if (err) {
        res.status(400).json({ error: "error on sql format" });
      }
      res
        .status(201)
        .send({
          message: `posts by userid ${userid} have been added to the database`,
        });
    }
  );
};
