/*jslint esversion:6 */
const _ = require('lodash');

module.exports = {
	addOne: function (param) {
        const vendorId = param.vendorId;
        const productId = param.productId;
        const name = param.name;
        const info = param.info;
        const avatarUri = param.companyName;
				const current = Date.now();
        return [vendorId, productId, name, info, avatarUri, current, current];
	},

	update: function (param, vendorIx) {
				const vendorId = param.vendorId;
				const productId = param.productId;
        const name = param.name;
        const info = param.info;
        const avatarUri = param.companyName;
				const current = Date.now();
				return [vendorId, productId, name, info, avatarUri, current, vendorIx];
	},

	getList: function (result, count, pg, limit) {
		if (!result) return;
    return {companies: result, count: count, page: pg, limit: limit}
	}
};
