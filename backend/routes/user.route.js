const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../model/appModel.js');

// Add User
userRoute.route('/create-user').post((req, res, next) => {
	User.createUser(req.body, (error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
});

// Get all users
userRoute.route('/').get((req, res) => {
	User.getAllUser((error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
});

// Get single user
userRoute.route('/get-user/:id').get((req, res) => {
	User.getUserById(req.params.id, (error, data) => {
		if (error) {
			return next(error)
		} else {
			res.json(data)
		}
	})
});


// Update user
userRoute.route('/update-user/:id').put((req, res, next) => {
	User.updateById(req.params.id, req.body, (error, data) => {
		if (error) {
			return next(error);
			console.log(error)
		} else {
			res.json(data);
			console.log('User successfully updated!')
		}
	})
});

// Delete User
userRoute.route('/delete-user/:id').delete((req, res, next) => {
	User.remove(req.params.id, (error, data) => {
		if (error) {
			return next(error);
		} else {
			res.status(200).json({msg: data})
		}
	})
});

module.exports = userRoute;
