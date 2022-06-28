const {Client} = require("pg"); // DECLARATION OF THE VARIABLE THAT WILL CONTAIN THE POSTGRES.

const client = new Client(process.env.DB_URL); // Configuring for PostgreSQL Database connection;

module.exports = client;
