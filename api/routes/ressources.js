const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');

//Package zur Übersetzung der SQL Responses in JSON-Format einbinden
router.use(bodyparser.json());

//Datenbankverbindung einbinden
require('../../db');

//Countries
//Liefere eine Liste alle Länder zurück
router.get('/countries', (req, res, next) =>  {
	const id = req.params.countryId;
	connection.query("SELECT DISTINCT land FROM adresse", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows)
			res.send(rows);
			else {
			console.log('error');
			}
		}
	});
});

//Liefere den Namen des Landes zurück, zu dem die Ländernummer gehört
router.get('/countries/:countryId', (req, res, next) =>  {
	const countryId = req.params.countryId;
	connection.query("SELECT DISTINCT land FROM adresse WHERE landID = '" + countryId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows)
			res.send(rows);
			else {
			console.log('error');
			}
		}
	});
});

//Locations
//Liefere alle Betriebe (BNR) zurück, die im spezifischen Land existieren
router.get('/countries/:countryId/locations', (req, res, next) =>  {
	const countryId = req.params.countryId;
	connection.query("SELECT bnr FROM betrieb WHERE bnr IN (SELECT bnr FROM lage WHERE adressID IN(SELECT adressID FROM adresse WHERE landID =" + countryId + "));", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows)
			res.send(rows);
			else {
			console.log('error');
			}
		}
	});
});


//Liefere die Angaben zum Betrieb zurück (nur BNR)
router.get('/countries/:countryId/locations/:locationId', (req, res, next) =>  {
	const countryId = req.params.countryId;
	const locationId = req.params.locationId;
	connection.query("SELECT bnr FROM betrieb WHERE bnr = " + locationId , (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows){
			res.send(rows);
			}
			else {
			console.log('error');
			return;
			}
		}
	});
});

//Parts
//Liefere alle Bestände (TNR und Mengen) zurück, die in der Lokation noch vorrätig sind
router.get('/countries/:countryId/locations/:locationId/parts', (req, res, next) =>  {
	const countryId = req.params.countryId;
	const locationId = req.params.locationId;
	connection.query("SELECT tnr, menge FROM bestand WHERE bnr = '" + locationId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows)
			res.send(rows);
			else {
			console.log('error');
			}
		}
	});
});


//Liefere Bestand an einer spezifischen Lokation zu einem spezifischen Ersatzteil
router.get('/countries/:countryId/locations/:locationId/parts/:partsId', (req, res, next) =>  {
	const countryId = req.params.countryId;
	const locationId = req.params.locationId;
	const partsId = req.params.partsId;
	connection.query("SELECT menge FROM bestand WHERE bnr = '" + locationId + "' AND tnr = '" + partsId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows){
			res.send(rows);
			}
			else {
			console.log('error');
			return;
			}
		}
	});
});

//Liefere eine Liste an Händlern (BNR und Mengen), die das Teil vorrätig haben
router.get('/parts/:partsId', (req, res, next) =>  {
	const partsId = req.params.partsId;
	console.log(partsId);
	connection.query("SELECT bnr, menge FROM bestand WHERE tnr = '" + partsId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows){
			res.send(rows);
			}
			else {
			console.log('error');
			return;
			}
		}
	});
});

module.exports = router;
