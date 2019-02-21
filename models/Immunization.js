const mongoose = require('mongoose');

const immunizationSchema = new mongoose.Schema({
    nameOfImmunization: {type: String, trim: true, required: true},
    date: {type: String, trim: true, required: true},
    type: {type: String, trim: true, required: true},
    dose: {type: String, trim: true, required: true}
});

module.exports = mongoose.model('Immunization', immunizationSchema);
