const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const { register } = require("../Controller/users/register");
const { login } = require("../Controller/users/login");

const { getAllUsers } = require("../Controller/users/getAllUsers");
const { getOneUser } = require("../Controller/users/getOneUser");
const { updateUser } = require("../Controller/users/updateUsers");
const { updatePassword } = require("../Controller/users/updatePassword");
const { deleteUser } = require("../Controller/users/deleteUser");
const { updateEmail } = require("../Controller/users/updateEmail");
const { updateName } = require("../Controller/users/updateName");
const { getUserImage } = require("../controller/image/getImages");
const { getAll } = require('../controller/users/checkFollowers')
const { toFollow } = require("../controller/users/toFollow");
// const { unFollow} = require("../controller/users/unFollow");
const { suggestedUsers } = require("../controller/users/suggestedUsers");
const { followers } = require('../controller/users/followers')
const { following } = require('../controller/users/getFollowing')
const { checkFollow } = require('../controller/users/checkIfFollowed');
const verifyUser = require('../middleware/middleware')

app.post("/register", register); // Post request to register the users
app.post("/login", login); //Post to login users

app.get("/get/:id", getAllUsers); // get all existing users
app.get("/getone/:id", getOneUser); //get single user

app.put("/updateUser/:id", updateUser); // update all details of user
app.put("/updateName/:id", updateName); //update the name of user
app.put("/updatePassword/:id", updatePassword); // update user password for login
app.put("/updateEmail/:id", updateEmail); // update user email for login

app.delete("/deleteUser/:id", deleteUser); // delete a user
app.get("/getimage/:id", getUserImage);

app.post("/toFollow", toFollow);     //follow users
// app.post("/unFollow", unFollow);     //unfollow users
app.get("/suggestedUsers/:id", suggestedUsers);     //follow users
app.get("/getall/:id", getAll);
app.get("/followers/:id", followers);
app.get('/getfollow/:id', following);
app.get('/check/:id/:followid', checkFollow);

//get user with token
const { getUser } = require('../controller/users/getUserWithToken');
app.get("/getid", verifyUser, getUser);

//delete your post
const { deletePost } = require('../controller/image/deletePost');
app.delete("/delete/:postid/:id", deletePost);

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
// import multer from 'multer';
// import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dadevelopers",
  api_key: "925629111347791",
  api_secret: "E4XwZdXQLzGyAwj9jVo1ngBpXtw",
});

require("dotenv").config();
const pool = require("../config/database");
const { unlinkSync } = require("fs");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//***************************************** */
// exports.uploadFile = (file, folder)=> {
//     return new promises(resolve =>{
//         cloudinary.uploader.upload(file, (result) => {
//             resolve({
//                 url: result.url,
//                 id: result.public_id
//             },{
//                 resource_type: "auto",
//                 folder: folder
//             })
//         })
//     })
// }
/****************************************** */

try {
  var upload = multer({ dest: "upload/" });

var type = upload.single("myfile");

app.post("/upload", type, async (req, res) => {

  const { userid, caption } = req.body;

  var date = new Date().toDateString()
    + ' ' + new Date().getHours()
    + ':' + new Date().getMinutes() + ':'
    + new Date().getSeconds();

  console.log(date);
  if (req.file) {
    const results = await cloudinary.uploader.upload(req.file.path, {
      folder: "/profile/",
    });
    const image = results.url;
    console.log(results);

    console.log(req.file);

    pool.query("INSERT INTO images(userid, image, caption, date) VALUES ($1,$2,$3,$4)", [
      userid,
      image,
      caption,
      date
    ]);

    res.status(200).json({ success: "Picture have been uploaded" });
  } else {
    pool.query("INSERT INTO images(userid, caption, date) VALUES ($1,$2,$3)", [
      userid,
      caption,
      date
    ]);

    res.status(200).json({ success: "Text have been uploaded" });
  }
});

} catch (error) {
  console.log(error.message)
}

  //profile

try{
  var profile = multer({ dest: "upload/" });

var file = profile.single("myfile");

app.put("/profile", file, async (req, res) => {

  const { userid } = req.body;


  if (req.file) {
    const results = await cloudinary.uploader.upload(req.file.path, {
      folder: "/profilePicture/",
    });
    const image = results.url;
    console.log(results);

    console.log(req.file);

    pool.query("UPDATE users SET image = $1 WHERE id = $2", [
      image,
      userid,
    ]);

    res.status(200).json({ success: "Picture have been uploaded" });
  }

});
}catch(error){
  console.log(error.message)
}


module.exports = app;
