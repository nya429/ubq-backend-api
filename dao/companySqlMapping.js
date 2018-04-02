/*jslint esversion:6 */
const company = {
	insert:'insert into company(name, info, address_street_1, address_street_2, address_city, address_state, address_zip, address_country, contact_title, contact_first_name, contact_last_name, contact_phone, contact_email, avatar_uri, create_time, update_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
	update:'update company set name=?, info=?, address_street_1=?, address_street_2=?, address_city=?, address_state=?, address_zip=?, address_country=?, contact_title=?, contact_first_name=?, contact_last_name=?, contact_phone=?, contact_email=?, avatar_uri=?, update_time=? where company_id=?',
	delete: 'delete from company where company_id=?',
	queryById: 'select * from company where company_id=?',
	// queryAll: "select * from company order by create_time DESC limit ? offset ?",
	queryAll: "select c.*, count(p.participant_id) as p_cnt from company as c left join participant as p on c.company_id = p.company_id group by c.company_id order by c.name limit ? offset ?",
	queryAllOrderASC: "select * from company order by ?? limit ? offset ? ",
	queryAllOrderDESC: "select * from company order by ?? DESC limit ? offset ? ",
	queryAllCnt: 'select count(*) from company',
	queryByKeyword: "select * from company where (name like ?) or (contact_name like ?) or (address like ?)",
	queryByName: "select C.company_id, C.name as company_name, count(participant.company_id) as p_cnt from (select company_id, name from company where company.name like ?) as C left join participant on C.company_id = participant.company_id group by C.company_id order by C.name limit ?;"
};

module.exports = company;
