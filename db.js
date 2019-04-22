const express = require('express');
const mysql = require('mysql');

const server = require('./server');

//Verbindung zur lokalen MySQL Datenbank initiieren
global.connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'bestandsmanagement'
	
});

//Verbindung zur Datenbank aufbauen
connection.connect(function(error){
	if (error){
		console.log('Error');
	} else {
		console.log('Verbindung zur DB erfolgreich!');
	}
});


