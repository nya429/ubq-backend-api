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

	update: function (param, trackerId) {
				const name = param.name;
				const email = param.email;
				const address = param.address;
				const contactName = param.contactName;
				const contactPhone = param.contactPhone;
				const avatarUri = param.avatarUri;
				const priorityStatus = param.priorityStatus;
				const current = Date.now();
				return [name, email, address, contactName, contactPhone, avatarUri, priorityStatus, current, trackerId];
	},

	getList: function (result, count, pg, limit) {
		if (!result) return;
    return {trackers: result, count: count, page: pg, limit: limit}
	},

	setKeyOpts: function (key, limit) {
		return  _.concat(key, limit);
	},



};
