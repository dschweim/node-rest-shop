const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests to /partss'
	});	
});

router.post('/', (req, res, next) => {
	res.status(201).json({
		message: 'Handling POST requests to /parts'
	});	
});

router.get('/:partId', (req, res, next) =>  {
	const id = req.params.partId;
	if (id === 'special'){
		res.status(200).json({
			message: 'Special ID',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'You passed an ID'
		});
	}
});

module.exports = router;
