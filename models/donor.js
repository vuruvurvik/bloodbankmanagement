const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donorSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    bloodType: String,
    city: String,
    state: String
});

module.exports = mongoose.model('Donor', donorSchema);
