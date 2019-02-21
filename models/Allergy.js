const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
    nameOfAllergy: {type: String, trim: true, required: true},
    reaction: {type: String, trim: true, required: true},
    severity: {type: String, trim: true, required: true}
});

module.exports = mongoose.model('Allergy', allergySchema);
