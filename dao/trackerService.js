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

	getTrackers: function (result) {
		if (!result) return;
		return {trackers: result}
	},

	setKeyOpts: function (key, limit) {
		return  _.concat(key, limit);
	},

	pullCustomerId: function(locs) {
		const tagIdArray = _.flatMap(locs, loc =>  [loc.customer_id]);
		// return `${tagIdArray.join()}`;
		return tagIdArray;
	},

	intoString: function(keys) {
		let str =  keys.join("','");
		return str;
	  },
};
