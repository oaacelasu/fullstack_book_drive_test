const dbManager = require('../controllers/db_manager.js');

const dashboard = (req, res) => res.render('dashboard');

const g = (req, res) => {
    res.render('g', {user: null, error: null});
};

const gEdit = (req, res) => {
    let license = req.query.license;

    dbManager.getUserByLicense(license, (error, userF) => {
        if (error) {
            console.log(error);
        } else {
            {
                console.log("User Found:" + userF);
                res.render('g', {user: userF, error: userF ? null : "No User Found!!"});
            }
        }
    });
};

const g2 = (req, res) => res.render('g2');

const g2Add = (req, res) => {

    let e = req.body;

    dbManager.createUser({
            firstName: e.firstName,
            lastName: e.lastName,
            licenseNo: e.license,
            age: e.age,
            dob: e.dob,
            carDetails: {
                make: e.make,
                model: e.model,
                year: e.year,
                color: e.color,
                plateNo: e.plateNo
            }
        }, (error, userCreated) => {
            if (error) {
                console.log(error);
            } else {
                console.log("User Created Successfully as:" + userCreated);
                res.redirect("/");
            }
        }
    );
}

const gUpdate = (req, res) => {
    let userId = req.params.id;

    let e = req.body;

    dbManager.updateUser(userId,
        {
            carDetails: {
                make: e.make,
                model: e.model,
                year: e.year,
                color: e.color,
                plateNo: e.plateNo
            }
        }
        , (error, userCreated) => {
            if (error) {
                console.log(error);
            } else {
                console.log("User Updated Successfully as:" + userCreated);
                res.redirect("/");
            }
        }
    );
}

const login = (req, res) => res.render('login');

module.exports = {g, gEdit, gUpdate, g2, g2Add, login, dashboard};