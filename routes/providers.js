const express = require('express');
const router = express.Router();

const Provider = require('../models/Provider');

// CREATE a provider
router.post('/', (req, res) => {
    const provider = new Provider(req.body);
    provider.save()
        .then(provider => {
            res.send(provider)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the provider."
            });
        })
})

// FETCH all providers
router.get('/', (req, res) => {
    Provider.find()
        .then(providers => {
            res.send(providers)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
})

// FIND a provider
router.get('/:id', (req, res) => {
    Provider.findById(req.params.id)
        .then(provider => {
            if(!provider) {
                return res.status(404).send({
                    message: "Provider not found with id " + req.params.id + '.'
                });
            }
            res.send(provider)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Provider not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error retrieving provider with id " + req.params.id + '.'
            })
        })
})

// UPDATE a provider
router.put('/:id', (req, res) => {
    let objForUpdate = {};
    if (req.body.nameOfProvider) objForUpdate.nameOfProvider = req.body.nameOfProvider;
    if (req.body.address) objForUpdate.address = req.body.address;
    if (req.body.telephone) objForUpdate.telephone = req.body.telephone;
    objForUpdate = { $set: objForUpdate };

    Provider.findByIdAndUpdate(req.params.id, objForUpdate, {new: true})
        .then(provider => {
            if(!provider) {
                return res.status(404).send({
                    message: "Provider not found with id " + req.params.id + '.'
                });
            }
            res.send(provider)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Provider not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error updating provider with id " + req.params.id + '.'
            });
        })
})

// DELETE a provider
router.delete('/:id', (req, res) => {
    Provider.findByIdAndRemove(req.params.id)
        .then(provider => {
            if(!provider) {
                return res.status(404).send({
                    message: "Provider not found with id " + req.params.id + '.'
                });
            }
            res.send({message: "Provider deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Provider not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Could not delete provider with id " + req.params.id + '.'
            });
        })
})

module.exports = router;
