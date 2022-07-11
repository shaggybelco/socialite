
const pool = require("../../config/database");

//toFollow Function

exports.toFollow = async (req, res) => {
    const { userid, followid,followStatus } = req.body;

    try {
        const data = await pool.query(`SELECT * FROM follow WHERE userid=$1 AND followStatus !=$2;`,
            [userid, followStatus]); //Check if already following
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "User alraedy Following , No need to follow again.",
            });
        } else {
            const user = {
                userid,
                followid,
                followStatus
            };
            var flag = 1;

            //Inserting data into the database
            pool.query(
                `INSERT INTO follow (userid, followid,followStatus) VALUES ($1,$2,$3);`,
                [user.userid, user.followid,user.followStatus],
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
                            .send({ message: `User called with ID  ${followid} has been followed by user with ID ${userid}` });
                    }
                }
            );
            if (flag) {
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while following user!", //Database connection error
        });
    }
};
