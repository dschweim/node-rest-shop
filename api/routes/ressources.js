const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const auth = require('../../auth');

//Package zur Übersetzung der SQL Responses in JSON-Format einbinden
router.use(bodyparser.json());

//Datenbankverbindung einbinden
require('../../db');

//Countries
//Liefere eine Liste alle Länder zurück
router.get('/countries', auth, (req, res, next) =>  {
	connection.query("SELECT DISTINCT land FROM adresse", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});

//Liefere den Namen des Landes zurück, zu dem die Ländernummer gehört
router.get('/countries/:countryId', auth,(req, res, next) =>  { 
	const countryId = req.params.countryId;
	
	connection.query("SELECT DISTINCT land FROM adresse WHERE landID = '" + countryId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});

//Locations
//Liefere alle Betriebe (BNR) zurück, die im spezifischen Land existieren
router.get('/countries/:countryId/locations', auth, (req, res, next) =>  {
	const countryId = req.params.countryId;
	
	connection.query("SELECT bnr FROM betrieb WHERE bnr IN (SELECT bnr FROM lage WHERE adressID IN(SELECT adressID FROM adresse WHERE landID =" + countryId + "));", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});


//Liefere die Angaben zum Betrieb zurück (nur BNR)
router.get('/countries/:countryId/locations/:locationId', auth, (req, res, next) =>  {
	const countryId = req.params.countryId;
	const locationId = req.params.locationId;
	
	connection.query("SELECT bnr FROM betrieb WHERE bnr = " + locationId , (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});

//Parts
//Liefere alle Bestände (TNR und Mengen) zurück, die in der Lokation noch vorrätig sind
router.get('/countries/:countryId/locations/:locationId/parts', auth, (req, res, next) =>  {
	const countryId = req.params.countryId;
	const locationId = req.params.locationId;
	
	connection.query("SELECT tnr, menge FROM bestand WHERE bnr = '" + locationId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});


//Liefere Bestand an einer spezifischen Lokation zu einem spezifischen Ersatzteil
router.get('/countries/:countryId/locations/:locationId/parts/:partsId', auth, (req, res, next) =>  {
	const countryId = req.params.countryId;
	const locationId = req.params.locationId;
	const partsId = req.params.partsId;
	
	connection.query("SELECT menge FROM bestand WHERE bnr = '" + locationId + "' AND tnr = '" + partsId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});

//Liefere eine Liste an Händlern (BNR und Mengen), die das Teil vorrätig haben
router.get('/parts/:partsId', auth, (req, res, next) =>  {
	const partsId = req.params.partsId;
	
	connection.query("SELECT bnr, menge FROM bestand WHERE tnr = '" + partsId + "'", (error, rows) => {
		if(error)
		console.log(error);
		else {
			//falls Abfrageergebnis >0
			if(rows.length > 0){
			res.send(rows);
			}
			else {
				res.status(204).json();
			}
		}
	});
});

//Fehlermeldung für nicht unterstützte Abfrageformate
router.all('/countries' ,(req, res, next) => {
    res.status(405).json();
});
router.all('/countries/:countryId',(req, res, next) => {
    res.status(405).json();
});
router.all('/countries/:countryId/locations',(req, res, next) => {
    res.status(405).json();
});
router.all('/countries/:countryId/locations/:locationId' ,(req, res, next) => {
    res.status(405).json();
});
router.all('/countries/:countryId/locations/:locationId/parts',(req, res, next) => {
    res.status(405).json();
});
router.all('/countries/:countryId/locations/:locationId/parts/:partsId',(req, res, next) => {
    res.status(405).json();
});
router.all('/parts/:partsId',(req, res, next) => {
    res.status(405).json();
});

module.exports = router;
