'user strict';
var sql = require('../db/db.js');

//User object constructor
var User = function(user){
	this.name = user.name;
	this.surname = user.surname;
	this.birthday = new Date(user.birthday);
	this.username = user.username;
	this.status = 1;
	this.created_at = new Date();
};
User.createUser = function (newUser, result) {
	newUser.birthday = new Date(newUser.birthday);
	console.log('Birthday: ', newUser.birthday);
	sql.query("INSERT INTO users set ?", newUser, function (err, res) {

		if(err) {
			console.log("error: ", err);
			result(err, null);
		}
		else{
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};
User.getUserById = function (userId, result) {
	sql.query("Select * from users where id = ?", userId, function (err, res) {
		if(err) {
			console.log("error: ", err);
			result(err, null);
		}
		else{
			result(null, res[0]);

		}
	});
};
User.getAllUser = function (result) {
	sql.query("Select * from users", function (err, res) {

		if(err) {
			console.log("error: ", err);
			result(null, err);
		}
		else{
			console.log('users : ', res);

			result(null, res);
		}
	});
};
User.updateById = function(id, user, result){

	user.birthday = new Date(user.birthday);
	console.log('Birthday: ', user.birthday);
	sql.query("UPDATE users set ? WHERE id = ?", [user, id], function (err, res) {
		if(err) {
			console.log("error: ", err);
			result(null, err);
		}
		else{
			result(null, res);
		}
	});
};
User.remove = function(id, result){
	sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {

		if(err) {
			console.log("error: ", err);
			result(null, err);
		}
		else{

			result(null, res);
		}
	});
};

module.exports= User;
