/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./participantSqlMapping');
const $companysql = require('./companySqlMapping');
const $service = require('./participantService');
const CONST = require('../util/constant');

const pool  = mysql.createPool($conf.mysql);

module.exports = {
	add: function (req, res, next) {
			pool.getConnection(function(err, connection) {
				const param = req.body;
				if (param.companyId.length > 0) {
					connection.query($sql.insert, $service.addOne(param), function(err, result) {
						connection.release();
						jsonWrite(res, result, err);
					});
				} else {
					connection.query($companysql.insert, $service.addTempCompany(param), function(err, result) {
						param.companyId = result['insertId'];
						connection.query($sql.insert, $service.addOne(param), function(err, result) {
							connection.release();
							jsonWrite(res, result, err);
						});
					});
				}


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

			const limit = req.query.ltd ? +req.query.ltd : CONST.PAGE_LIMIT;
			const offset = req.query.offset ? +req.query.offset : CONST.INDEX_0;
			const orderer = req.query.sortBy ? req.query.sortBy : null;
			const order = req.query.orderBy ? req.query.orderBy : null;
			const query = !orderer ? $sql.queryAll : (order === 'DESC' ? $sql.queryAllOrderDESC : $sql.queryAllOrderASC);

			connection.query($sql.queryAllCnt, function(err, result) {
				const count = result[0]['count(*)'];

				connection.query(query, $service.setOpts(limit, offset, orderer), function(err, result) {
          result = $service.getList(result, count, offset, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},


  getByParticipantByCompanyId: function (req, res, next) {
		pool.getConnection(function(err, connection) {
				let companyId = req.query.companyId;
				const offset = req.query.offset ? +req.query.offset : CONST.INDEX_0;
				const limit = req.query.ltd || CONST.PAGE_LIMIT ;
				connection.query($sql.queryByCidCnt, companyId, function(err, result) {
				const count = result[0]['count(*)'];
				connection.query($sql.queryByCid, companyId, function(err, result) {
					result = $service.getList(result, count, offset, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},

	searchByKeyword: function (req, res, next) {
		pool.getConnection(function(err, connection) {
				const term = $service.parseTerm(req.query.term);

				const limit = req.query.ltd ? +req.query.ltd : CONST.PAGE_LIMIT;
				const offset = req.query.offset ? +req.query.offset : CONST.INDEX_0;
				const orderer = req.query.sortBy ? req.query.sortBy : null;
				const order = req.query.orderBy ? req.query.orderBy : null;
				const $query = !orderer ? $sql.queryByKeyword : (order === 'DESC' ? $sql.queryByKeywordOrderDESC : $sql.queryByKeywordOrderASC);

				connection.query($sql.queryByKeywordCnt, term, function(err, result) {
				const count = result[0]['count(*)'];
				connection.query($query, $service.setKeyOpts(limit, offset, orderer, term), function(err, result) {
					result = $service.getList(result, count, offset, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},

	searchByFilters: function (req, res, next) {
		pool.getConnection(function(err, connection) {

			const param = req.body;
			const companyId = +param.companyId;
			const term = $service.parseName(param.term);
			const priorityStatus = +param.priority;

			let $queryFilter = companyId !== 0 ? ` and company_id = ${companyId}` : '';
			$queryFilter = $queryFilter + (priorityStatus !== 0 ? ` and priority_status = ${priorityStatus}` : '');

			const limit = req.query.ltd ? +req.query.ltd : CONST.PAGE_LIMIT;
			const offset = req.query.offset ? +req.query.offset : CONST.INDEX_0;
			const orderer = req.query.sortBy ? req.query.sortBy : null;
			const order = req.query.orderBy ? req.query.orderBy : null;

			let $queryCon = orderer ? ` order by ${orderer}` : ` order by update_time`;
			$queryCon = $queryCon + (order ? ` ${order}` : ' DESC');
			$queryCon = $queryCon + ` limit ${limit} offset ${offset}`;

			const $queryCnt = $sql.queryByFilterCntPrefix + $queryFilter;
			const $query = $sql.queryByFilterPrefix + $queryFilter + $queryCon;

			connection.query($queryCnt, term, function(err, result) {
			const count = result[0]['count(*)'];
				connection.query($query, term, function(err, result) {
					result = $service.getList(result, count, offset, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			});
		});
	},

};
