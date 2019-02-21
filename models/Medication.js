const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    nameOfMedication: {type: String, trim: true, required: true},
    date: {type: String, trim: true, required: true},
    type: {type: String, trim: true, required: true},
    instructions: {type: String, trim: true, required: true},
    dose: {type: String, trim: true, required: true},
    rate: {type: String, trim: true, required: true},
    nameOfPrescriber: {type: String, trim: true, required: true},
});

module.exports = mongoose.model('Immunizations', medicationSchema);
