const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Embedding documents is fastest way of creating MongoDB relationships.
- Encounter and Guardian are two entities with one-to-one relationship where the element of type Guardian
may be linked to just one element of type Encounter and vice versa.
- Encounter and Plan are two entities with one-to-one relationship where the element of type Guardian
may be linked to just one element of type Plan and vice versa.
*/

/*
One-To-Many can be used to describe MongoDB relationships in which one side can have more than one relationship
with the other, while the reverse relationship can only be one-sided.
- Encounter can have one provider, but provider can provide many encounters
*/

/*
Many-To-Many relationship happens when two entities might have many relationships between each other.
An example of that is when:
- Many medications can be subscribed on one encounter, and one medication can be subscribed in many encounters
*/

/*
Embedding vs. referencing
Guardian is small, doesn't change often and is not used alone, similar like plan so it is better to use them
embedded.
*/

const guardianSchema = new mongoose.Schema({
    role: {type: String, trim: true, required: true},
    firstName: {type: String, trim: true, required: true},
    lastName: {type: String, trim: true, required: true},
    address: {type: String, trim: true, default: ''},
    telephone: {type: String, trim: true, default: ''}
});

const planSchema = new mongoose.Schema({
    nameOfPlannedActivity: {type: String, trim: true, required: true},
    date: {type: String, trim: true, required: true},
    instruction: {type: String, trim: true, default: ''}
});

const encounterSchema = new mongoose.Schema({
    nameOfEncounter: {type: String, trim: true, required: true},
    location: {type: String, trim: true, required: true},
    date: {type: String, trim: true, required: true},
    doctor: {type: String, trim: true, required: true},
    guardian: guardianSchema,
    plan: planSchema,
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider'
    },
    medications: [{
        type: Schema.Types.ObjectId,
        ref: 'Medication'
    }]
});

module.exports = mongoose.model('Encounter', encounterSchema);
