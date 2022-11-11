const mongoose = require('mongoose');
const {STRING_CONNECTION} = require('../public/app_constants.js')
const {Schema} = require("mongoose");

class DbManager {
    constructor() {
        this.connection = null;
        this.user = null;
    }

    // expose user
    static getUser() {
        return this.user;
    }

    static async init() {
        try {
            this.connection = await mongoose.connect(STRING_CONNECTION, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            console.log("Connection Success!");

            const carDetailSchema = new Schema({
                make: String,
                model: String,
                year: String,
                color: String,
                plateNo: String
            });

            new mongoose.model("carDetails", carDetailSchema);

            const userScheme = new mongoose.Schema({
                firstName: String,
                lastName: String,
                licenseNo: String,
                age: Number,
                carDetails: carDetailSchema
            });
            this.user = new mongoose.model("user", userScheme);

        } catch (error) {
            console.log(error);
            console.log("Connection Failed!");
        }
    }

    static createUser(user, callback) {
        if (this.user) {
            this.user.create(user, callback);
        }
    }

    static updateUser(id, user, callback) {
        if (this.user) {
            this.user.findByIdAndUpdate(id, user, callback);
        }
    }

    static getUserByLicense(license, callback) {
        if (this.user) {
            this.user.findOne({
                licenseNo: license
            }, callback);
        }
    }
}

module.exports = DbManager;