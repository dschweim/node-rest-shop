const express = require('express');
const router = express.Router();

//Datenbankverbindung einbinden
require('../../db');

router.post('/signup', (req, res, next) => {
	if (error) {
		return res.status(500).json({
			error: error
		});
	} else {
		const email = req.body.email;
		const password = req.body.password;
	
		connection.query("INSERT INTO user (email, password) VALUES ('" + email + "','" + password + "');";
		res.status(200).json({
			message: 'User was created';
		});
		console.log('Succesfull');
	};
	
	
module.exports = router;