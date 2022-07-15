const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const { getAllfollow  } = require("../controller/friendsfollowed/query");
const {getCountAllFollowers} = require("../controller/friendsfollowed/query");
const {getCountAllFollowing} = require("../controller/friendsfollowed/query");

app.get("/getfollow", getAllfollow );
app.get("/countfollowers", getCountAllFollowers );
app.get("/countfollowing", getCountAllFollowing );

module.exports = app;
