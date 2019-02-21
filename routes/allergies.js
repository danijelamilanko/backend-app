const express = require('express');
const router = express.Router();

const Allergy = require('../models/Allergy');

// CREATE a allergy
router.post('/', (req, res) => {
    const allergy = new Allergy(req.body);
    allergy.save()
        .then(allergy => {
            res.send(allergy)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the allergy."
            });
        })
})

// FETCH all allergys
router.get('/', (req, res) => {
    Allergy.find()
        .then(allergys => {
            res.send(allergys)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
})

// FIND a allergy
router.get('/:id', (req, res) => {
    Allergy.findById(req.params.id)
        .then(allergy => {
            if(!allergy) {
                return res.status(404).send({
                    message: "Allergy not found with id " + req.params.id + '.'
                });
            }
            res.send(allergy)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Allergy not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error retrieving allergy with id " + req.params.id + '.'
            })
        })
})

// UPDATE a allergy
router.put('/:id', (req, res) => {
    let objForUpdate = {};
    if (req.body.nameOfAllergy) objForUpdate.nameOfAllergy = req.body.nameOfAllergy;
    if (req.body.reaction) objForUpdate.reaction = req.body.reaction;
    if (req.body.severity) objForUpdate.severity = req.body.severity;
    objForUpdate = { $set: objForUpdate };

    Allergy.findByIdAndUpdate(req.params.id, objForUpdate, {new: true})
        .then(allergy => {
            if(!allergy) {
                return res.status(404).send({
                    message: "Allergy not found with id " + req.params.id + '.'
                });
            }
            res.send(allergy)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Allergy not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error updating allergy with id " + req.params.id + '.'
            });
        })
})

// DELETE a allergy
router.delete('/:id', (req, res) => {
    Allergy.findByIdAndRemove(req.params.id)
        .then(allergy => {
            if(!allergy) {
                return res.status(404).send({
                    message: "Allergy not found with id " + req.params.id + '.'
                });
            }
            res.send({message: "Allergy deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Allergy not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Could not delete allergy with id " + req.params.id + '.'
            });
        })
})

module.exports = router;
