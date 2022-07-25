const jwt_decode = require("jwt-decode");

module.exports = async (req, res) => {
    var token = req.header("token");

    try{
        var decoded = jwt_decode(token);
        res.status(200).json({decoded})
    }catch(error){
        res.status(401).json({message: "no token provided"});
    }
}