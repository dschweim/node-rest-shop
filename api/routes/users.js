const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');

//Package zur Übersetzung der SQL Responses in JSON-Format einbinden
router.use(bodyparser.json());

//Datenbankverbindung einbinden
require('../../db');

router.post('/signup', (req, res, next) => {
		const email = req.body.email;
		const password = req.body.password;
	
	//Prüfen ob User schon vorhanden ist
	connection.query("SELECT email FROM user WHERE email = '" + email + "'" , (error, rows) => {
		if(error) {
			res.status(500).json({
				error: error
			});
		}
		else {
			//Falls User noch nicht existiert, neu anlegen
			if(!rows.length > 0){
				connection.query("INSERT INTO user (email, password) VALUES ('" + email + "','" + password + "')", (error, rows) => {
					if(error) {
						res.status(500).json({
							error: error
						});
					}
					else {
						res.status(201).json({
							message: 'User created'
						});
					}
					});
			}
			else {
				res.status(409).json({
					message: 'User already exists'
				});
			}
		}
	});
	
	
		
		console.log('Succesfull');
		//console.log(email);
});
	
//Fehlermeldung für nicht unterstützte Abfrageformate
router.all('/signup' ,(req, res, next) => {
    res.status(405).json();
});
	
module.exports = router;