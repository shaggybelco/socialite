
const pool = require("../../config/database");

//unFollow Function

exports.toFollow = async (req, res) => {
    const { userid, followid,followStatus } = req.body;

    try {
        
        const { id, userid} = req.body;

    pool.query(
      'update users set follow = array_remove(follow, $1) where id = $2;',
      [userid, parseInt(id)],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`User ${userid} modified with ID: ${id}`);
      }
    );

            //Inserting data into the database
            pool.query(
                `DELETE FROM follow WHERE userid = $1, followid = $2, followStatus = $3`,
                [userid,followid,followStatus],
                (err) => {
                    if (err) {
                        flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error",
                        });
                    } else {
                        flag = 1;
                        res
                            .status(200)
                            .send({ message: `User called with ID  ${followid} has been unfollowed by user with ID ${userid}` });
                    }
                }
            );
            if (flag) {
            }
        }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while following user!", //Database connection error
        });
    }
};
