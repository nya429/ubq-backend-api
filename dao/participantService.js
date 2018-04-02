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

	getList: function (result, count, offset, limit) {
		if (!result) return;
    return {participants: result, count: count, offset: offset, limit: limit}
	},

	setOpts: function (limit, offset, orderer, ) {
		return orderer ? [orderer, limit, offset] : [limit, offset];
	},

	setKeyOpts: function (limit, offset, orderer, term) {
		return orderer ? _.concat(term, orderer, limit, offset) : _.concat(term, limit, offset);
	},

	parseTerm: function (term) {
		// key.replace("[", "[[]").replace("_","[_]").replace("%","[%]");
		console.log(term);
		term = _.trim(term);
		const array = term.length > 0 ? _.words(term): '';
		if(array.length > 1) {
			console.log([`%${array[0]}%`, array[1].length < 2 ? '' : `%${array[1]}%`, `%${term}%`, `%${term}%`]);
			return [ array[0].length < 2 ? '' : `%${array[0]}%`,array[1].length < 2 ? '' : `%${array[1]}%`, `%${term}%`, `%${term}%`, `%${term}%`];
		} else {
			term = `%${term}%`;
			console.log([term, term, term, term]);
			return [term, term, term, term, term];
		}
	},

	addTempCompany: function (param) {
				const firstName = param.firstName;
				const lastName = param.lastName;
				const companyName = param.companyName;
				const phone = param.phone;
				const email = param.email;
				const current = Date.now();
				return [companyName, null, null, null, null, null, null, null, null, firstName, lastName, phone, email, null, current, current];
	},
};
