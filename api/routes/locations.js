const express = require('express');
const router = express.Router();

//countryId = req.params.countryId;
//console.log(countryId);

router.get('/:locationId', (req, res, next) => {
	res.status(200).json({
		message: 'Der Bestand in der Lokation:' + req.params.locationId + 'beträgt 300'
	});
});

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'Country was created'
	});
});

router.get('/:locationId', (req, res, next) =>  {
	res.status(200).json({
		message: 'location details',
		orderID: req.params.locationId
	});
});

router.delete('/:locationId', (req, res, next) =>  {
	res.status(200).json({
		message: 'Country deleted',
		orderID: req.params.locationId
	});
});

module.exports = router;
