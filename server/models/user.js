const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CarDetailsSchema} = require('./car_detail');

const UserSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    userType: {type: String, required: true},
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    licenseNo: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    carDetails: {
        type: CarDetailsSchema,
        default: {}
    },
    appointment: { type: Schema.Types.ObjectId, ref: 'appointment'},
    testType: {
        type: String,
        default: ''
    },
    comment: {
        type: String,
        default: ''
    },
    testStatus: {
        type: String,
        default: ''
    }
});

const model = new mongoose.model('user', UserSchema);
module.exports = model
