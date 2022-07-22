const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const { getAllPosts } = require("../controller/newsfeed/get");
const { getUserPosts } = require("../controller/newsfeed/getone");
const { createStatus } = require("../controller/newsfeed/post");
const { deletePost } = require("../controller/newsfeed/delete");
const { updatePost } = require("../controller/newsfeed/update");
const { view } = require("../controller/newsfeed/view");

app.get("/getstatus", getAllPosts);
app.post("/poststatus", createStatus);
app.delete("/deletepost/:id", deletePost);
app.put("/updatestatus/:id", updatePost);
app.get("/getone/:id", getUserPosts);
app.get("/getother/:id", view)

module.exports = app;
