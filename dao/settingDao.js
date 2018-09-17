const mysql = require('mysql');

const $conf = require('../conf/mysql');
const { jsonWrite } = require('../util/util');
const $sql = require('./settingSqlMapping');
const $service = require('./settingService');
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

  getAll: function(req, res, next) {
    pool.getConnection(function(err, connection) {

      const limit = req.query.ltd ? +req.query.ltd : CONST.SETTING_LIMIT;
      const offset = req.query.offset ? +req.query.offset : CONST.INDEX_0;
      const orderer = req.query.sortBy ? req.query.sortBy : null;
      const order = req.query.orderBy ? req.query.orderBy : null;
      const query = $sql.queryAll;

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

  getOne: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      const id = +req.params.id;
      connection.query($sql.queryById, id, function(err, result) {
        result = result[0]
        jsonWrite(res, result, err);
        connection.release();
      });
    });
  },

  isKeyTaken: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      const key = req.body.key;
      connection.query($sql.queryKeyCnt, key, function(err, result) {
        const count = result[0]['count(*)'];
        const isTaken = count > 0 ? true : false;
        result = {isTaken: isTaken};
        jsonWrite(res, result, err);
        connection.release();
      });
    });
  },

  isRemovable: function() {

  }
};
