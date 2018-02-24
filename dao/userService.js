/*jslint esversion:6 */
const userService = {
  addOne: function(param) {
    const current = Date.now();
    console.log(current);
    // return [param.email, param.password, current, current];
    return ['test@gmail.com', 1234, current, current];
  },
  update: function(param)  {
    const current = Date.now();
    return [param.email, param.password, current];
  }
};

module.exports = userService; 