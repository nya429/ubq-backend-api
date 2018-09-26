const setting = {
  insert:'insert into setting_universal(setting_key, setting_value) VALUES(?,?)',
  update:'update setting_universal set setting_value=? where setting_id=?',
  delete: 'delete from setting_universal where setting_id=?',
  queryAll: "select * from setting_universal limit ? offset ?",
  queryAllCnt: 'select count(*) from setting_universal',
  queryById: 'select * from setting_universal where setting_id=?',
  queryKeyCnt: 'select count(*) from setting_universal where setting_key=?',
  queryIdByKey: 'select setting_id from setting_universal where setting_key=?',
  queryByKeys: 'select * from setting_universal where setting_key in (?)'
}

module.exports = setting;
