/*jslint esversion:6 */
const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./trackerSqlMapping');
const $pSql = require('./participantSqlMapping');
const $service = require('./trackerService');
const CONST = require('../util/constant');

const pool  = mysql.createPool($conf.mysql);

module.exports = {
	add: function (req, res, next) {
			pool.getConnection(function(err, connection) {
				if (err) throw err;
				const param = req.body;
				connection.query($sql.insert, $service.addOne(param), function(err, result) {
					connection.release();
          jsonWrite(res, result, err);
				});

			});
	},

	update: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err) throw err;
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
			if (err) throw err;
			const id = req.params.id;
			connection.query($sql.queryById, id, function(err, result) {
				if (err) throw err;
				result = result[0]
				jsonWrite(res, result, err);
				connection.release();
				});
		});
	},

	delete: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err) throw err;
			const id = +req.params.id;
			connection.query($sql.delete, id, function(err, result) {
				if (err) throw err;
				jsonWrite(res, result, err);
				connection.release();
			});
		});
	},

	getList: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err) throw err;
			const page = req.query.pg || 1;
			const limit = req.query.ltd || CONST.SEARCH_LIMIT  ;
			connection.query($sql.queryAllCnt, function(err, result) {
				if (err) throw err;
				const count = result[0]['count(*)'];
				connection.query($sql.queryAll, function(err, result) {
					if (err) throw err;
          result = $service.getList(result, count, page, limit);
					jsonWrite(res, result, err);
					connection.release();
				});
			})
		});
	},

	searchByKeyword: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err) throw err;
				let key = `${req.query.key}%` || '';
				const limit = CONST.SEARCH_LIMIT ;

				connection.query($sql.queryByKeyword, $service.setKeyOpts(key, limit), function(err, result) {
					if (err) throw err;
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
					if (err) throw err;
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
	},

  /**
  *   get location by given
	        begin ? start time : min
			end ? end : max
			speickfic time ? time +_ ?? period : null;
  */
	getTrackerLocsByTime: function(req, res, next) {
		pool.getConnection(function(err, connection) {
      if (err) throw err;
			// I need start time
			const param = req.body;
			// if  start > end return
			const startTime = req.body.begin ? +req.body.begin : null;
			const endTime = req.body.end ? +req.body.end : null;
			// if null return
			let id = req.body.id;
			////bulk select
      // const ids = req.body.ids;
      // let index = 0;
			const $get = 'select customer_id, loc_x, loc_y, unix_timestamp(time) as time from simulation_data_1 where customer_id = ? and unix_timestamp(time) between (select unix_timestamp(min(time)) from simulation_data_1 where customer_id = ?) and (select unix_timestamp(max(time)) from simulation_data_1 where customer_id = ?)';

			connection.query($get, [id, id, id], function(err, result) {
        if (err) throw err;
         //bulk select
				// if(index >= ids.length) { } else {}
				// console.log(result);
				jsonWrite(res, result, err);
				connection.release();

			});
		})
	},

	/**
	*   return last active tagIds with limit
	*/
	getLastActivedTrackers: function(req, res, next) {
		let limit = 15;
		pool.getConnection(function(err, connection) {
			if (err) throw err;
			connection.query($sql.queryLastActive, limit, function(err, result) {
	        if (err) throw err;
				let trackers = result;
				connection.query($pSql.queryByTagIds, [$service.pullCustomerId(result)], function(err, result) {
					if (err) throw err;
					result = $service.getTrackers(result);
					jsonWrite(res, result, err);
					connection.release();
			 })

			});
		})
	},
	  
	/**
   	*  return min and max timestamp
	*/
	getTrackerLocHisById: function(req, res, next) {

	},

	  /**
    *  return locs and time, based on custom_id
	*/
	getLastLoctionsByIds: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			if (err) throw err;
			const ids = req.body.ids;
			const sql = $sql.queryLastLocationsByIds.replace('?', `'${$service.intoString(ids)}'`)
			connection.query(sql, function(err, result) {
				if (err) throw err;
				let trackers = result;
				trackers = result.map(tracker => 
					{return {[tracker['customer_id']] : tracker }}
				);
				jsonWrite(res, trackers, err);
				connection.release();
				});
		});
	}
	
};
