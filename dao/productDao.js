/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./productSqlMapping');
const $service = require('./productService');
const CONST = require('../util/constant');

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
			const page = req.query.pg || 1;
			const limit = req.query.ltd || CONST.PAGE_LIMIT  ;
			connection.query($sql.queryAllCnt, function(err, result) {
				const count = result[0]['count(*)'];
				connection.query($sql.queryAll, function(err, result) {
          result = $service.getList(result, count, page, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},


  getByproductById: function (req, res, next) {
		pool.getConnection(function(err, connection) {
				let companyId = req.query.companyId;
				const page = req.query.pg || 1;
				const limit = req.query.ltd || CONST.PAGE_LIMIT ;
				connection.query($sql.queryByCidCnt, companyId, function(err, result) {
				const count = result[0]['count(*)'];
				connection.query($sql.queryByCid, companyId, function(err, result) {
					result = $service.getList(result, count, page, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},

	searchByKeyword: function (req, res, next) {
		pool.getConnection(function(err, connection) {
				let key = `%${req.query.key}%` || '';
				// key.replace("[", "[[]").replace("_","[_]").replace("%","[%]");
				const page = req.query.pg || 1;
				const limit = req.query.ltd || CONST.PAGE_LIMIT ;
				connection.query($sql.queryAllCnt, function(err, result) {
				const count = result[0]['count(*)'];
				connection.query($sql.queryByKeyword, [key, key, key], function(err, result) {
					result = $service.getList(result, count, page, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},

};
