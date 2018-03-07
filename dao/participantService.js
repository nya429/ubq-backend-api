/*jslint esversion:6 */
const _ = require('lodash');

module.exports = {
	addOne: function (param) {
        const companyId = param.companyId;
        const tagId = param.tagId;
        const firstName = param.firstName;
        const lastName = param.lastName;
        const companyName = param.companyName;
				const jobTitle = param.jobTitle;
        const email = param.email;
				const phone = param.phone;
        const avatarUri = param.avatarUri;
				const priorityStatus = param.priorityStatus;
				const current = Date.now();
        return [companyId, tagId, firstName, lastName, companyName, jobTitle, email, phone, avatarUri, priorityStatus, current, current];
	},

	update: function (param, participantId) {
				const companyId = param.companyId;
				const tagId = param.tagId;
				const firstName = param.firstName;
				const lastName = param.lastName;
				const companyName = param.companyName;
				const jobTitle = param.jobTitle;
				const email = param.email;
				const phone = param.phone;
				const avatarUri = param.avatarUri;
				const priorityStatus = param.priorityStatus;
				const current = Date.now();
				return [companyId, tagId, firstName, lastName, companyName, jobTitle, email, phone, avatarUri, priorityStatus, current, participantId];
	},

	getList: function (result, count, pg, limit) {
		if (!result) return;
    return {participants: result, count: count, page: pg, limit: limit}
	},

	getOpts: function (limit, offset) {
		return [limit, offset]
	}
};
