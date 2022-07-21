const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const { unfollow } = require('../controller/users/unfollow');

app.put('/unfollow', unfollow);

module.exports = app;