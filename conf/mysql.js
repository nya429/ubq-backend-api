/*jslint esversion:6 */
const mysql = require('mysql');
//mac local
// const conf = {mysql: {
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   database : 'ubq_ems_db',
//   password : 'bsg'
// }};

//win local
// const conf = {mysql: {
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   database : 'ubq_ems_db',
//   password : '8888'
// }};

//aws_rds
const conf = {mysql: {
  connectionLimit : 10,
  host     : 'ubq-ems-db.cpzqoyxyhoka.us-east-2.rds.amazonaws.com',
  user     : 'root',
  database : 'ubq_ems_db',
  password : '88888888'
}};

module.exports = conf;

// pool.getConnection(function(err, connection) {
//     connection.query('SELECT * from USER', function(err, rows, fields) {
//         connection.release();
//         console.log('The solution is: ', rows[0]);
//         if (err) throw err;
//       });
// });
