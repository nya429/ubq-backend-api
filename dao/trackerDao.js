/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./trackerSqlMapping');
const $service = require('./trackerService');
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
			const id = req.params.id;
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

	getList: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			const page = req.query.pg || 1;
			const limit = req.query.ltd || CONST.SEARCH_LIMIT  ;
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

	searchByKeyword: function (req, res, next) {
		pool.getConnection(function(err, connection) {
				let key = `%${req.query.key}%` || '';
				const limit = CONST.SEARCH_LIMIT ;

				connection.query($sql.queryByKeyword, $service.setKeyOpts(key, limit), function(err, result) {
					jsonWrite(res, result, err);
					connection.release();
				});
			})
	},

	isTrackerValid: function(req, res, next) {
		pool.getConnection(function(err, connection) {
				//00 not signed: not exist
				let isValid = {'isValid' : 0 };
				const tagId = req.query.id
				connection.query($sql.queryById, tagId, function(err, result) {
					if(result.length > 0 ) {
						connection.query($sql.isSigned, tagId, function(err, result) {
							//01 not signed : exist      11 signed: exist
							isValid.isValid = result[0]['count(*)'] === 0 ? 1 : 3;
							jsonWrite(res, isValid, err);
							connection.release();
						});
					} else {
						jsonWrite(res, isValid, err);
						connection.release();
					}
				});
		});
	}
};
