//db for API
const express = require('express');
const mysql = require('mysql')
const app = express();
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'bestandsmanagement'
	
});

connection.connect(function(error) {
	if (error){
		console.log('Error');
	} else {
		console.log('Connected to DB!');
	}
});

app.get('/', function(req, resp) {
	//Mysql Abfrage
	connection.query("INSERT INTO ersatzteil (tnr, beschreibung, typ, preis, marke)VALUES (22245678999, 'Test', 'Typ', 34.56, 'mb')", function(error, rows, fields){
	//callback
		if(!!error){
			console.log('Error in the query');
		} else {
			console.log('Successful query');
		}
	});
	


})
app.listen(3000);
	