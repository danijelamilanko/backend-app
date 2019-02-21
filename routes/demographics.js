const express = require('express');
const router = express.Router();

const Demographic = require('../models/Demographic');

// CREATE a demographic
router.post('/', (req, res) => {
    const demographic = new Demographic(req.body);
    demographic.save()
        .then(demographic => {
            res.send(demographic)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the demographic."
            });
        })
})

// FETCH all demographics
router.get('/', (req, res) => {
    Demographic.find()
        .then(demographics => {
            res.send(demographics)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
})

// FIND a demographic
router.get('/:id', (req, res) => {
    Demographic.findById(req.params.id)
        .populate('allergies')
        .populate('encounters')
        .populate('immunizations')
        .then(demographic => {
            if(!demographic) {
                return res.status(404).send({
                    message: "Demographic not found with id " + req.params.id + '.'
                });
            }
            res.send(demographic)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Demographic not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error retrieving demographic with id " + req.params.id + '.'
            })
        })
})

// UPDATE a demographic
router.put('/:id', (req, res) => {
    let objForUpdate = {};
    if (req.body.firstName) objForUpdate.firstName = req.body.firstName;
    if (req.body.lastName) objForUpdate.lastName = req.body.lastName;
    if (req.body.gender) objForUpdate.gender = req.body.gender;
    if (req.body.materialStatus) objForUpdate.materialStatus = req.body.materialStatus;
    if (req.body.religiousAffiliation) objForUpdate.religiousAffiliation = req.body.religiousAffiliation;
    if (req.body.ethnicity) objForUpdate.ethnicity = req.body.ethnicity;
    if (req.body.languageSpoken) objForUpdate.languageSpoken = req.body.languageSpoken;
    if (req.body.address) objForUpdate.address = req.body.address;
    if (req.body.telephone) objForUpdate.telephone = req.body.telephone;
    if (req.body.birthday) objForUpdate.birthday = req.body.birthday;
    if (req.body.allergies) objForUpdate.allergies = req.body.allergies;
    if (req.body.encounters) objForUpdate.encounters = req.body.encounters;
    if (req.body.immunizations) objForUpdate.allergies = req.body.immunizations;
    objForUpdate = { $set: objForUpdate };

    Demographic.findByIdAndUpdate(req.params.id, objForUpdate, {new: true})
        .then(demographic => {
            if(!demographic) {
                return res.status(404).send({
                    message: "Demographic not found with id " + req.params.id + '.'
                });
            }
            res.send(demographic)
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Demographic not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Error updating demographic with id " + req.params.id + '.'
            });
        })
})

// DELETE a demographic
router.delete('/:id', (req, res) => {
    Demographic.findByIdAndRemove(req.params.id)
        .then(demographic => {
            if(!demographic) {
                return res.status(404).send({
                    message: "Demographic not found with id " + req.params.id + '.'
                });
            }
            res.send({message: "Demographic deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Demographic not found with id " + req.params.id + '.'
                });
            }
            res.status(500).send({
                message: "Could not delete demographic with id " + req.params.id + '.'
            });
        })
})

module.exports = router;
