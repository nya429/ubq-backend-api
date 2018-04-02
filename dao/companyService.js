/*jslint esversion:6 */
const _ = require('lodash');

module.exports = {
	addOne: function (param) {
        const name = param.name;
	      const info = param.info;
				const addressStreet1 = param.addressStreet1;
				const addressStreet2 = param.addressStreet2;
				const addressCity = param.addressCity;
				const addressState = param.addressState;
				const addressZip = param.addressZip;
				const addressCountry = param.addressCountry;
				const contactTitle = param.contactTitle;
        const contactFirsName = param.contactFirstName;
        const contactLastName = param.contactLastName;
				const contactPhone = param.contactPhone;
				const contactEmail = param.contactEmail;
        const avatarUri = param.avatarUri;
				const current = Date.now();
        return [name, info, addressStreet1, addressStreet2, addressCity, addressState, addressZip, addressCountry, contactTitle, contactFirsName, contactLastName, contactPhone, contactEmail, avatarUri, current, current];
	},

	update: function (param, companyId) {
				const name = param.name;
				const info = param.info;
				const contactTitle = param.contactTitle;
				const contactFirsName = param.contactFirstName;
				const contactLastName = param.contactLastName;
				const contactPhone = param.contactPhone;
				const contactEmail = param.contactEmail;
				const addressStreet1 = param.addressStreet1;
				const addressStreet2 = param.addressStreet2;
				const addressCity = param.addressCity;
				const addressState = param.addressState;
				const addressZip = param.addressZip;
				const addressCountry = param.addressCountry;
				const avatarUri = param.avatarUri;
				const current = Date.now();
				return [name, info, addressStreet1, addressStreet2, addressCity, addressState, addressZip, addressCountry, contactTitle, contactFirsName, contactLastName, contactPhone, contactEmail, avatarUri, current, companyId];
	},

	getList: function (result, count, offset, limit) {
		if (!result) return;
    return {companies: result, count: count, offset: offset, limit: limit}
	},

	setKeyOpts: function (key, limit) {
		return  _.concat(key, limit);
	},

	setOpts: function (limit, offset, orderer, ) {
		return orderer ? [orderer, limit, offset] : [limit, offset];
	},

};
