const Pool = require("pg").Pool;
const pool = new Pool({
  user: "oratile",
  host: "localhost",
  database: "socials",
  password: "oratile16",
  port: 5432,
}); // connect to the database

module.exports = pool;