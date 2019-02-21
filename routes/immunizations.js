const express = require('express');
const router = express.Router();

const Immunization = require('../models/Immunization');

// CREATE a immunization
router.post('/', (req, res) => {
    const immunization = new Immunization(req.body);
    immunization.save()
        .then(immunization => {
            res.send(immunization)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the immunization."
            });
        })
})

// FETCH all immunizations
router.get('/', (req, res) => {
    Immunization.find()
        .then(immunizations => {
            res.send(immunizations)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
})

// FIND a immunization
router.get('/:id', (req, res) => {
    Immunization.findById(req.params.id)
        .then(immunization => {
            if(!immunization) {
                return res.status(404).send({
                    message: "Immunization not found with id " + req.params.id + '.'
                });
            }
            res.send(immunization)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Immunization not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error retrieving immunization with id " + req.params.id + '.'
            })
        })
})

// UPDATE a immunization
router.put('/:id', (req, res) => {
    let objForUpdate = {};
    if (req.body.nameOfImmunization) objForUpdate.nameOfImmunization = req.body.nameOfImmunization;
    if (req.body.date) objForUpdate.date = req.body.date;
    if (req.body.type) objForUpdate.type = req.body.type;
    if (req.body.dose) objForUpdate.dose = req.body.dose;
    objForUpdate = { $set: objForUpdate };

    Immunization.findByIdAndUpdate(req.params.id, objForUpdate, {new: true})
        .then(immunization => {
            if(!immunization) {
                return res.status(404).send({
                    message: "Immunization not found with id " + req.params.id + '.'
                });
            }
            res.send(immunization)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Immunization not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error updating immunization with id " + req.params.id + '.'
            });
        })
})

// DELETE a immunization
router.delete('/:id', (req, res) => {
    Immunization.findByIdAndRemove(req.params.id)
        .then(immunization => {
            if(!immunization) {
                return res.status(404).send({
                    message: "Immunization not found with id " + req.params.id + '.'
                });
            }
            res.send({message: "Immunization deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Immunization not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Could not delete immunization with id " + req.params.id + '.'
            });
        })
})

module.exports = router;
