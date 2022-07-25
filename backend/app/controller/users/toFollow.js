
const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser')


//Get all users in database
exports.suggestedUsers = (req, res) => {
  //declare variable to store form data
  const id = parseInt(req.params.id);

  //declare function & get params
  pool.query('select users.id, users.name from users left join follow on users.id = follow.followid where follow.userid is null AND users.id <> $1',
  [id],
  (error, results) => {
    // sequiliaze to get all userrs from the table
    if (error) {
      // if statement to catch errors if there's any
      throw error; // if error found, throw it
    }
    res.status(200).json(results.rows); // the results of the sql statement
  });
};


//toFollow Function

exports.toFollow = async (req, res) => {
    const { userid, followid } = req.body;

    try {
        const data = await pool.query(`SELECT * FROM
        (SELECT *,
                generate_subscripts(follow, 1) AS s
           FROM users) AS foo
      WHERE follow[s] = $1 and id = $2;`,
            [followid,userid]); //Check if already following
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "User alraedy Following , No need to follow again.",
            });
        } else {
           

            pool.query('UPDATE users SET follow = array_append(follow, $2) where id = $1',[userid,followid],(error) =>{
                if(error){
                    res.status(400).json({
                        error:"Database Error !!!!!"
                    })
                }else{
                    res.status(200).send("Succesfully followed ")
                }
            });

            // This Will work For newsFeeds
            
            pool.query(
                `INSERT INTO follow (userid, followid) VALUES ($1,$2);`,
                [userid, followid],
                (err) => {
                    if (err) {
                        flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error",
                        });
                    } else {
                        flag = 1;
            
                    }
                }
            );

            //end here 
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while following user!", //Database connection error
        });
    }
};
