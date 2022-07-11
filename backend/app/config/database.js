const {Client} = require("pg");

// const pool = new Pool({
//   user: "oratile",
//   host: "localhost",
//   database: "socials",
//   password: "oratile16",
//   port: 5432,
// }); // connect to the database

//const {pool} = require("pg");

const client = new Client(process.env.DB_URL); // Configuring for PostgreSQL Database connection;



//Connecting to heroku database
//const pool = new Pool({ connectionString: process.env.DB_URL, ssl:{rejectUnauthorized:false} })

module.exports = client;