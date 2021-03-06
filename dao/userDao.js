/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./userSqlMapping');
const $service = require('./userService');

// const UserModel = require('../model/userModel.ts');

// const pool  = mysql.createPool($util.extend({}, $conf.mysql));
const pool  = mysql.createPool($conf.mysql);


module.exports = {
	add: function (req, res, next) {
			pool.getConnection(function(err, connection) {
				const param = req.body;
				console.log($service.addOne(param));
				connection.query($sql.insert, $service.addOne(param), function(err, result) {
					jsonWrite(res, result, err);
					connection.release();
				});
			});
	},

	update: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			const id = +req.params.id;
			const param = req.body;
			connection.query($sql.update, $service.update(param, id), function(err, result) {
				jsonWrite(res, result, err);
				connection.release();
			});
		});
	},

	getOne: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			const id = +req.params.id;
			connection.query($sql.queryById, id, function(err, result) {
				result = result[0]
				jsonWrite(res, result, err);
				connection.release();
			});
		});
	},

	delete: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			const id = +req.params.id;
			connection.query($sql.delete, id, function(err, result) {
				jsonWrite(res, result, err);
				connection.release();
			});
		});
	},

	getAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAllCnt, function(err, result) {
				const count = result[0]['count(*)'];
				connection.query($sql.queryAll, function(err, result) {
					result = $service.getAll(result, count);
					jsonWrite(res, result, err);
					connection.release();
				});
			})

		});
	}



};
