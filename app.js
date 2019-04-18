const express = require('express');
const app = express();

const countryRes = require('./api/routes/countries');
const locationRes = require('./api/routes/locations');
//const partRes = require('./api/routes/parts');

app.use('/countries/:countryId/locations', locationRes);
app.use('/countries', countryRes);
//app.use('/parts', partRes);

//app.use('/countries/locations', locationRes);

module.exports = app;