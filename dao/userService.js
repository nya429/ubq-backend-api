/*jslint esversion:6 */
const _ = require('lodash');

const userService = {

  addOne: function(param) {
    const email = param.email;
    const password = param.password;
    const lastName = param.lastName;
    const firstName = param.firstName;
    const role = param.role;
    const vendorId = param.role === 2 ? param.vendorId : null;
    const current = Date.now();
    return [email, lastName, firstName, role, vendorId, password, current, current];
  },

  update: function(param, userId)  {
    const lastName = param.lastName;
    const firstName = param.firstName;
    const current = Date.now();
    return [firstName, lastName, current, userId];
  },

  getAll: function(result, count) {
    if (!result) return;
    return {users: result, count: count}
  }
};

module.exports = userService;
