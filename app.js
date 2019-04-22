const express = require('express');
const app = express();

//Requests werden automatisch durch das Package geloggt und in der Konsole gezeigt
const morgan = require('morgan');

//Einbinden der Ressourcen 
const countryRes = require('./api/routes/ressources');

//Einbinden des Morgan Package
app.use(morgan('dev'));

//Middleware zur Weiterleitung der Requests
app.use('/', countryRes);


//Verarbeitung der Anfragen, falls ungültiges Anfrageformat (ungültigte URL) liefere Fehlercode
app.use((req, res, next) => {
	const error = new Error('Ungültige URL (not found)');
	error.status = 404;
	next(error);
})

//Für andere Errors als Not found: Gebe Statuscode oder 500
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});


module.exports = app;