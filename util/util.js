const CONST = require('./constant')/*jslint esversion:6 */
const logger = require('../log/logger');

const jsonWrite = function (res, rst, err) {
	if(typeof rst === 'undefined') {
    // Delete msg  when deployed
    console.log(err);
		res.json({
			code: CONST.FAIL,
			msg: err
		});
	} else {
    if(rst) {
			const data = 'message' in rst ? rst.message : rst;
     rst = {
		          code: CONST.SUCCESS,
							msg: 'success',
							data: data
             };
		 }
		res.json(rst);
	}
};

module.exports = { jsonWrite };
