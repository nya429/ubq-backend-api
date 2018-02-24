const mysql = require('mysql');

const $conf = require('../conf/mysql');
// const $util = require('../util/util');
const $sql = require('./userSqlMapping');


// var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool  = mysql.createPool($conf.mysql);

const jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: 'failed'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;

			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'insert success'
					};
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接
				connection.release();
			});
		});
	},

	getAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {

			connection.query($sql.queryAll, function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'getAll success',
						data: result
					};
				}

				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);

				// 释放连接
				connection.release();
			});
		});
	}



};
