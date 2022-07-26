const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const verifyUser = require('../middleware/middleware');

const { getAllPosts } = require("../controller/newsfeed/get");
const { getUserPosts } = require("../controller/newsfeed/getone");
const { createStatus } = require("../controller/newsfeed/post");
const { deletePost } = require("../controller/newsfeed/delete");
const { updatePost } = require("../controller/newsfeed/update");
const { view } = require("../controller/newsfeed/view");
const { viewPost } = require('../controller/newsfeed/viewPost');
const {getProfileImage} = require('../controller/users/getprofileImage');

app.get("/getstatus", getAllPosts);
app.post("/poststatus", createStatus);
app.delete("/deletepost/:id", deletePost);
app.put("/updatestatus/:id", updatePost);
app.get("/getone/:id", getUserPosts);
app.get("/getother/:id", verifyUser ,view)
app.get("/getOthers/:id", view);
app.get("/getprofileImage/:id", getProfileImage);

module.exports = app;
