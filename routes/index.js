const routes = require('express').Router();
const allergies = require('./allergies');
const immunizations = require('./immunizations');
const medications = require('./medications');
const providers = require('./providers');
const demographics = require('./demographics');
const encounters = require('./encounters');

routes.use('/allergies', allergies);
routes.use('/immunizations', immunizations);
routes.use('/medications', medications);
routes.use('/providers', providers);
routes.use('/demographics', demographics);
routes.use('/encounters', encounters);

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

module.exports = routes;
