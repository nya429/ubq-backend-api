/*jslint esversion:6 */
const _ = require('lodash');

module.exports = {
	addOne: function (param) {
        const name = param.name;
        const info = param.info;
        const address = param.address;
        const contactName = param.contactName;
        const contactPhone = param.contactPhone;
        const avatarUri = param.avatarUri;
				const current = Date.now();
        return [name, info, address, contactName, contactPhone, avatarUri, current, current];
	},

	update: function (param, vendorId) {
				const name = param.name;
				const info = param.info;
				const address = param.address;
				const contactName = param.contactName;
				const contactPhone = param.contactPhone;
				const avatarUri = param.avatarUri;
				const current = Date.now();
				return [name, info, address, contactName, contactPhone, avatarUri, current, vendorId];
	},

	getList: function (result, count, pg, limit) {
		if (!result) return;
    return {companies: result, count: count, page: pg, limit: limit}
	}



};
