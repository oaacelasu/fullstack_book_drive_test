const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarDetailsSchema = new Schema({
    make: {
        type: String,
        default: ''
    },
    model: {
        type: String,
        default: ''
    },
    year: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    plateNo: {
        type: String,
        default: ''
    },
});
const model = new mongoose.model("carDetails", CarDetailsSchema);
module.exports = {model, CarDetailsSchema}