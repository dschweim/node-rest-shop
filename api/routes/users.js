const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

//Package zur Übersetzung der SQL Responses in JSON-Format einbinden
router.use(bodyparser.json());

//Datenbankverbindung einbinden
require('../../db');

router.post('/signup', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	
	//Prüfen ob email ein korrektes Format besitzt
	var re = /\S+@\S+\.\S+/;
	if (!re.test(email)){
		res.status(422).json();
	}
	else{
	
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
	
	}
		
});
	
	
router.post('/login', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	
	//Prüfen ob email ein korrektes Format besitzt
	var re = /\S+@\S+\.\S+/;
	if (!re.test(email)){
		res.status(422).json();
	}
	else{
	
	//Prüfen ob User existiert
	connection.query("SELECT email FROM user WHERE email = '" + email + "'" , (error, rows) => {
		if(error) {
			res.status(500).json({
				error: error
			});
		}
		else {
			//Falls User nicht existiert, Fehlermeldung ausgeben
			if(!rows.length > 0){
				res.status(401).json({
					message: 'Authorization failed'
				});
			}
			else {
				//Passwort abgleichen 
				connection.query("SELECT id FROM user WHERE email = '" + email + "' AND password = '" + password + "'", (error, rows) => {
									
					if(rows.length > 0){
										
						var userid = rows[0].id;
						
						const token = jwt.sign(
						{
							email: email,
							userid: userid
						}, 
						process.env.JWT_KEY, 
						{
							expiresIn: "1h"
						}
						);
						return res.status(200).json({
							message: 'Authorization succesful',
							token: token
						});
						
					}
					else {
						res.status(401).json({
							message: 'Authorization failed'
						});
					}
					
				});
						
			}
		}
	});
	
	}
		
});

		
//Fehlermeldung für nicht unterstützte Abfrageformate
router.all('/signup' ,(req, res, next) => {
    res.status(405).json();
});
	
module.exports = router;