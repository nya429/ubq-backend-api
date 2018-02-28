const CONST = require('./constant')/*jslint esversion:6 */


const jsonWrite = function (res, ret, msg) {
	if(typeof ret === 'undefined') {
    // Delete console when deployed
    console.log(msg);
		res.json({
			code:CONST.FAIL,
			msg: msg
		});
	} else {
    if(ret) {
      ret = {
          code: CONST.SUCCESS,
          msg:'success',
					data: ret
        };
      }
		res.json(ret);
	}
};

module.exports = { jsonWrite };
