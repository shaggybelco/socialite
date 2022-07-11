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

app.post("/register", register); // Post request to register the users
app.post("/login", login); //Post to login users

app.get("/get", getAllUsers); // get all existing users
app.get("/getone/:id", getOneUser); //get single user

app.put("/updateUser/:id", updateUser); // update all details of user
app.put("/updateName/:id", updateName); //update the name of user
app.put("/updatePassword/:id", updatePassword); // update user password for login
app.put("/updateEmail/:id", updateEmail); // update user email for login

app.delete("/deleteUser/:id", deleteUser); // delete a user
app.get("/getimage/:id", getUserImage);

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

var upload = multer({ dest: "upload/" });

var type = upload.single("myfile");

app.post("/upload", type, async (req, res) => {

  const { userid, caption } = req.body;

  if (req.file) {
    const results = await cloudinary.uploader.upload(req.file.path, {
      folder: "/profile/",
    });
    const image = results.url;
    console.log(results);

   

    pool.query("INSERT INTO images(userid, image, caption) VALUES ($1,$2,$3)", [
      userid,
      image,
      caption,
    ]);
  }

  console.log(req.file);
  res.status(200).json({ success: "Picture have been uploaded" });
  

  pool.query("INSERT INTO images(userid, caption) VALUES ($1,$2)", [
    userid,
    caption,
  ]);
});

module.exports = app;
