/*jslint esversion:6 */
const mysql = require('mysql');
// /*mac local*/
// const conf = {mysql: {
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   database : 'ubq_ems_db',
//   password : 'bsg'
// }};

// /*win local*/
// const conf = {mysql: {
//   connectionLimit : 10,
//   host     : 'localhost',
//   user     : 'root',
//   database : 'ubq_ems_db',
//   password : '8888'
// }};

// /*aws_rds*/
// const conf = {mysql: {
//   connectionLimit : 10,
//   host     : 'ubq-ems-db.cpzqoyxyhoka.us-east-2.rds.amazonaws.com',
//   user     : 'root',
//   database : 'ubq_ems_db',
//   password : '88888888'
// }};

/*aws_ubuntu*/
const conf = {mysql: {
  connectionLimit : 10,
  host     : '23.20.246.186',
  user     : 'ubq_ems_user@localhost',
  database : 'ubq_ems_db',
  password : 'ubq2018'
}};

module.exports = conf;
