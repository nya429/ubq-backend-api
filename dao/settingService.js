const _ = require('lodash');

module.exports = {
  addOne: function (param) {
        const value = param.value;
        const key = param.key;
        return [key, value];
	},

  // cannot update key
  update: function (param, settingId) {
    const value = param.value;
    const key = param.key;
    return [value, settingId];
  },

  getList: function(result, count, offset, limit) {
    if (!result) return;
    return {settings: result, count: count, offset: offset, limit: limit}
  },

  setOpts: function (limit, offset, orderer, ) {
    return orderer ? [orderer, limit, offset] : [limit, offset];
  },
}
