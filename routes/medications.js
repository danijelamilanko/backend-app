const express = require('express');
const router = express.Router();

const Medication = require('../models/Medication');

// CREATE a medication
router.post('/', (req, res) => {
    const medication = new Medication(req.body);
    medication.save()
        .then(medication => {
            res.send(medication)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the medication."
            });
        })
})

// FETCH all medications
router.get('/', (req, res) => {
    Medication.find()
        .then(medications => {
            res.send(medications)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
})

// FIND a medication
router.get('/:id', (req, res) => {
    Medication.findById(req.params.id)
        .then(medication => {
            if(!medication) {
                return res.status(404).send({
                    message: "Medication not found with id " + req.params.id + '.'
                });
            }
            res.send(medication)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Medication not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error retrieving medication with id " + req.params.id + '.'
            })
        })
})

// UPDATE a medication
router.put('/:id', (req, res) => {
    let objForUpdate = {};
    if (req.body.nameOfMedication) objForUpdate.nameOfMedication = req.body.nameOfMedication;
    if (req.body.date) objForUpdate.date = req.body.date;
    if (req.body.type) objForUpdate.type = req.body.type;
    if (req.body.instructions) objForUpdate.instructions = req.body.instructions;
    if (req.body.dose) objForUpdate.dose = req.body.dose;
    if (req.body.rate) objForUpdate.rate = req.body.rate;
    if (req.body.nameOfPrescriber) objForUpdate.type = req.body.nameOfPrescriber;
    objForUpdate = { $set: objForUpdate };

    Medication.findByIdAndUpdate(req.params.id, objForUpdate, {new: true})
        .then(medication => {
            if(!medication) {
                return res.status(404).send({
                    message: "Medication not found with id " + req.params.id + '.'
                });
            }
            res.send(medication)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Medication not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error updating medication with id " + req.params.id + '.'
            });
        })
})

// DELETE a medication
router.delete('/:id', (req, res) => {
    Medication.findByIdAndRemove(req.params.id)
        .then(medication => {
            if(!medication) {
                return res.status(404).send({
                    message: "Medication not found with id " + req.params.id + '.'
                });
            }
            res.send({message: "Medication deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Medication not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Could not delete medication with id " + req.params.id + '.'
            });
        })
})

module.exports = router;
