/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./companySqlMapping');
const $pSql = require('./participantSqlMapping');
const $service = require('./companyService');
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
				connection.query($pSql.updateCompanyNameBatch, [param.name, id], function(err, result) {
				  jsonWrite(res, result, err);
			  	connection.release();
				});
			});
		});
	},

	getOne: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			const id = +req.params.id;
			connection.query($sql.queryById, id, function(err, result) {
				let companyInfo = result[0];
				connection.query($pSql.queryByCidCnt, id, function(err, result) {
					companyInfo['participantCnt'] = result[0]['count(*)'];
					jsonWrite(res, companyInfo, err);
					connection.release();
				});
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

			const limit = req.query.ltd ? +req.query.ltd : CONST.PAGE_LIMIT;
			const offset = req.query.offset ? +req.query.offset : CONST.INDEX_0;
			const orderer = req.query.sortBy ? req.query.sortBy : null;
			const order = req.query.orderBy ? req.query.orderBy : null;

			connection.query($sql.queryAllCnt, function(err, result) {
				const count = result[0]['count(*)'];

				connection.query($sql.queryAll, $service.setOpts(limit, offset, orderer), function(err, result) {
          result = $service.getList(result, count, offset, limit);
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

	searchByName: function (req, res, next) {
		pool.getConnection(function(err, connection) {
				let name = `%${req.query.name}%` || '';
				const limit = CONST.SEARCH_LIMIT ;

				connection.query($sql.queryByName, $service.setKeyOpts(name, limit), function(err, result) {
					jsonWrite(res, result, err);
					connection.release();
				});
			})
	},

};
