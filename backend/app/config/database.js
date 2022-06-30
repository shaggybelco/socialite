const {Client} = require("pg"); // DECLARATION OF THE VARIABLE THAT WILL CONTAIN THE POSTGRES.

const client = new Client(process.env.DB_URL); // Configuring for PostgreSQL Database connection;
// const client = new Client({
//   user: 'oratile',
//   host: 'SG-PostgreNoSSL-14-pgsql-master.devservers.scalegrid.io',
//   database: 'postgres',
//   password: 'password',
//   port: 5432,
// })
// client.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = client;
