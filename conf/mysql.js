const mysql = require('mysql');

const conf = {mysql: {
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  database : 'ubq_ems_db',
  password : 'bsg'
}};

module.exports = conf;

// pool.getConnection(function(err, connection) {
//     connection.query('SELECT * from USER', function(err, rows, fields) {
//         connection.release();
//         console.log('The solution is: ', rows[0]);
//         if (err) throw err;
//       });
// });
