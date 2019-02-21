const express = require('express');
const router = express.Router();

const Encounter = require('../models/Encounter');

// CREATE a encounter
router.post('/', (req, res) => {
    const encounter = new Encounter(req.body);
    encounter.save()
        .then(encounter => {
            res.send(encounter)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the encounter."
            });
        })
})

// FETCH all encounters
router.get('/', (req, res) => {
    Encounter.find()
        .then(encounters => {
            res.send(encounters)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
})

// FIND a encounter
router.get('/:id', (req, res) => {
    Encounter.findById(req.params.id)
        .populate('provider')
        .populate('medications')
        .then(encounter => {
            if(!encounter) {
                return res.status(404).send({
                    message: "Encounter not found with id " + req.params.id + '.'
                });
            }
            res.send(encounter)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Encounter not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error retrieving encounter with id " + req.params.id + '.'
            })
        })
})

// UPDATE a encounter
router.put('/:id', (req, res) => {
    let objForUpdate = {};
    if (req.body.nameOfEncounter) objForUpdate.nameOfEncounter = req.body.nameOfEncounter;
    if (req.body.location) objForUpdate.location = req.body.location;
    if (req.body.date) objForUpdate.date = req.body.date;
    if (req.body.doctor) objForUpdate.doctor = req.body.doctor;
    if (req.body.guardian) objForUpdate.guardian = req.body.guardian;
    if (req.body.plan) objForUpdate.plan = req.body.plan;
    if (req.body.provider) objForUpdate.provider = req.body.provider;
    if (req.body.medications) objForUpdate.medications = req.body.medications;
    objForUpdate = { $set: objForUpdate };

    Encounter.findByIdAndUpdate(req.params.id, objForUpdate, {new: true})
        .then(encounter => {
            if(!encounter) {
                return res.status(404).send({
                    message: "Encounter not found with id " + req.params.id + '.'
                });
            }
            res.send(encounter)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Encounter not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error updating encounter with id " + req.params.id + '.'
            });
        })
})

// DELETE a encounter
router.delete('/:id', (req, res) => {
    Encounter.findByIdAndRemove(req.params.id)
        .then(encounter => {
            if(!encounter) {
                return res.status(404).send({
                    message: "Encounter not found with id " + req.params.id + '.'
                });
            }
            res.send({message: "Encounter deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Encounter not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Could not delete encounter with id " + req.params.id + '.'
            });
        })
})

module.exports = router;
