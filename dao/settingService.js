const _ = require('lodash');

module.exports = {
  addOne: function (param) {
        const value = param.value.trim();
        const key = param.key.trim();
        return [key, value];
	},

  // cannot update key
  update: function (param, settingId) {
    const value = param.value.trim();
    const key = param.key.trim();
    return [value, settingId];
  },

  getList: function(result, count, offset, limit) {
    if (!result) return;
    return {settings: result, count: count, offset: offset, limit: limit}
  },

  setOpts: function (limit, offset, orderer, ) {
    return orderer ? [orderer, limit, offset] : [limit, offset];
  },

  intoString: function(keys) {
    let str =  keys.join("','");
    return str;
  },

  populateString: function(settings, sql) {
    let sqls = settings.map(setting => {
      const key = setting['_key'];
      const value = setting['_value'];
      return sql(key, value);
    });

    return sqls.join(';');
  }
}
