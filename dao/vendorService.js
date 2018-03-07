/*jslint esversion:6 */
const _ = require('lodash');

module.exports = {
	addOne: function (param) {
        const name = param.name;
        const email = param.email;
        const address = param.address;
        const contactName = param.contactName;
        const contactPhone = param.contactPhone;
        const avatarUri = param.avatarUri;
				const priorityStatus = param.priorityStatus;
				const current = Date.now();
        return [name, email, address, contactName, contactPhone, avatarUri, priorityStatus, current, current];
	},

	update: function (param, vendorId) {
				const name = param.name;
				const email = param.email;
				const address = param.address;
				const contactName = param.contactName;
				const contactPhone = param.contactPhone;
				const avatarUri = param.avatarUri;
				const priorityStatus = param.priorityStatus;
				const current = Date.now();
				return [name, email, address, contactName, contactPhone, avatarUri, priorityStatus, current, vendorId];
	},

	getList: function (result, count, pg, limit) {
		if (!result) return;
    return {vendors: result, count: count, page: pg, limit: limit}
	}



};
