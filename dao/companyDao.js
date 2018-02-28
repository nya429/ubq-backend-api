/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./companySqlMapping');
const $service = require('./companyService');

const pool  = mysql.createPool($conf.mysql);

module.exports = {
	add: function (req, res, next) {
			pool.getConnection(function(err, connection) {
				const param = req.body;
				connection.query($sql.insert, $service.addOne(param), function(err, result) {
					connection.release();
          jsonWrite(res, result, err);
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
			connection.query($sql.queryCnt, function(err, result) {
				const count = result[0]['count(*)'];
				const page = req.query.pg
				const limit = req.query.ltd || 10 ;
				connection.query($sql.queryAll, function(err, result) {
          result = $service.getAll(result, count, page, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})

		});
	}



};
