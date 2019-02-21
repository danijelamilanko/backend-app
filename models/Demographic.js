const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
One-To-Many can be used to describe MongoDB relationships in which one side can have more than one relationship
with the other, while the reverse relationship can only be one-sided.
- Demographic can have many encounters, but an encounter can only belong to one demographic
*/

/*
Many-To-Many relationship happens when two entities might have many relationships between each other.
- Demographic can have multiple allergies, allergy can belong to many demographics
- Demographic can have multiple immunizations, and also immunizations can belong to many demographics
*/

/*
Embedding vs. referencing
Having One-To-Many MongoDB relationships does not mean that using embedding instead of referencing is a bad idea.
We can surely do that, for example when demographic can have many encounters.
The main advantage of that is you don’t have to perform any additional database traversing to get the embedded details.
We can’t access the details as standalone entities though, which we want to do with encounters.

In general, embedding the data works well for small subdocuments that do not change a lot.
Referencing by id is slower because you need additional queries, but it works well for large subdocuments
that change often and are often excluded from the result. Encounters are large, often change and could be excluded.
*/

const demographicSchema = new mongoose.Schema({
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    gender: {type: String, trim: true, default: ''},
    materialStatus: {type: String, trim: true, default: ''},
    religiousAffiliation: {type: String, trim: true, default: ''},
    ethnicity: {type: String, trim: true, default: ''},
    languageSpoken: {type: String, trim: true, default: ''},
    address: {type: String, trim: true, default: ''},
    telephone: {type: String, trim: true, default: ''},
    birthday: {type: Date, trim: true, default: ''},
    allergies: [{
        type: Schema.Types.ObjectId,
        ref: 'Allergy'
    }],
    encounters: [{
        type: Schema.Types.ObjectId,
        ref: 'Encounter'
    }],
    immunizations: [{
        type: Schema.Types.ObjectId,
        ref: 'Immunization'
    }]
});

module.exports = mongoose.model('Demographic', demographicSchema);
