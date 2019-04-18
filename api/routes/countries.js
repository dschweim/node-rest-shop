const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(400).json({
		message: 'Request should include a parameter countryId (3 digits)'
	});
});

router.post('/:countryId', (req, res, next) => {
	res.status(201).json({
		message: 'Successfully created country with id: ' + req.params.countryId
	});
});

router.get('/:countryId', (req, res, next) =>  {
	res.status(200).json({
		message: 'Country details',
		orderID: req.params.countryId
	});
});

router.delete('/:countyId', (req, res, next) =>  {
	res.status(200).json({
		message: 'Country deleted',
		orderID: req.params.countryId
	});
});

module.exports = router;
