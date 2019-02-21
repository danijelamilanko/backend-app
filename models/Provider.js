const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    nameOfProvider: {type: String, trim: true, required: true},
    address: {type: String, trim: true, required: true},
    telephone: {type: String, trim: true, required: true}
});

module.exports = mongoose.model('Provider', providerSchema);
