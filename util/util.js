/*jslint esversion:6 */
const jsonWrite = function (res, ret, msg) {
	if(typeof ret === 'undefined') {
        // Delete console when deployed
        console.log(msg);
		res.json({
			code:'1',
			msg: msg
		});
	} else {
        console.log(err);
        if(ret) {
            ret = {
                code: 200,
                msg:'success',
            };
        }
		res.json(ret);
	}
};


module.exports = { jsonWrite };