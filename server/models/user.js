const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    dateOfJoining: {
        type: Date,
    },
    title: {
        type: String,
        default: ''
    },
    department: {
        type: String,
        default: ''
    },
    employeeType: {
        type: String,
        default: ''
    },
});

const model = new mongoose.model('employee', UserSchema);
module.exports = model
