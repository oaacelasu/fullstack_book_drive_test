/** @member {Object} */
const userModel = require('../models/user');
const appointmentModel = require('../models/appointment');
const bcrypt = require('bcryptjs');

exports.dashboard = (req, res) => {
    res.render('dashboard', {userType: req.session.userType})
}

exports.g = async (req, res) => {
    let user = await userModel.findOne({_id: req.session.userId})

    if (!user) {
        return res.redirect('/logout')
    }

    console.log("User Found:" + user);

    if (user.licenseNo === "") {
        res.redirect('/g2')
    } else {
        if(user.appointment) {
            user.appointment = await appointmentModel.findById(user.appointment)
        }
        res.render('g', {user: user, userType: req.session.userType})
    }
};

exports.g_post = (req, res) => {
    let e = req.body;

    userModel.findByIdAndUpdate(req.session.userId,
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
                res.redirect("/dashboard");
            }
        }
    );
}

exports.g2 = async (req, res) => {
    let user = await userModel.findOne({_id: req.session.userId})

    if (!user) {
        return res.redirect('/logout')
    }

    console.log("User Found:" + user);

    if (user.licenseNo === "") {
        res.render('g2', {userType: req.session.userType})
    } else {
        if(user.appointment) {
            user.appointment = await appointmentModel.findById(user.appointment)
            res.render('g2_final.ejs', {user: user, userType: req.session.userType, date: null, times:null})
        } else {
            let date = req.query.date

            if(!date) {
                res.render('g2_final.ejs', {user: user, userType: req.session.userType, times:null, date: null})
            } else {
                let appointments = await appointmentModel.find({date, isTimeSlotAvailable: true})
                res.render('g2_final.ejs', {user: user, userType: req.session.userType, times: appointments.map(i => i.time), date: date})
            }
        }
    }
};

exports.g2_post = async (req, res) => {

    let e = req.body;

    const hashedLicense = await bcrypt.hash(e.license, 12)

    userModel.findByIdAndUpdate(req.session.userId,
        {
            firstName: e.firstName,
            lastName: e.lastName,
            licenseNo: hashedLicense,
            age: e.age,
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
                res.redirect("/g2");
            }
        }
    );
}

exports.g2_appointment_post = async (req, res) => {
    let data = JSON.parse(req.body.data);

    let appointment = await appointmentModel.findOne({
        date: data.date,
        time: data.time
    })

    userModel.findByIdAndUpdate(req.session.userId,
        {
            appointment: appointment._id
        }
        , async (error, userUpdated) => {
            if (error) {
                console.log(error);
            } else {
                console.log("User Updated Successfully as:" + userUpdated);
                appointment.isTimeSlotAvailable = false
                await appointment.save()
                res.redirect("/g2");
            }
        }
    );
}

exports.login = (req, res) => {
    const msg = req.query.msg;
    req.session.isAuth = false
    res.render('login', {msg: msg ?? 'Welcome! Please Enter Login Details'})
}

exports.login_post = async (req, res) => {
    const {userName, password} = req.body

    let user = await userModel.findOne({userName})

    if (!user) {
        return res.redirect('/register')
    }

    if (user) {
        const pwdMatch = await bcrypt.compare(password, user.password)
        if (pwdMatch) {
            req.session.isAuth = true
            req.session.userId = user._id
            req.session.userType = user.userType

            res.redirect('/dashboard')
        } else {
            let msg = 'Invalid Credentials'
            res.redirect(`/?msg=${msg}`);
        }
    }
}

exports.register = (req, res) => {
    req.session.isAuth = false
    res.render('register')
}

exports.register_post = async (req, res) => {
    let msg = ''
    const {userName, userType, password} = req.body

    let user = await userModel.findOne({userName})

    if (user) {
        msg = 'You are already Registered Please Enter Login Details!'
    } else {
        msg = 'Registration Successful! Please Enter Login Details!'
        const hashedPwd = await bcrypt.hash(password, 12)

        user = new userModel({
            userName,
            userType,
            password: hashedPwd
        })

        console.log(user)
        console.log("User Creation Started");
        await user.save()
        console.log("User Created Successfully as:" + user);
    }
    res.redirect(`/?msg=${msg}`);
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/')
    });
}

// Admin Routes
exports.appointments = async (req, res) => {
    let date = req.query.date
    let appointments = await appointmentModel.find({date})
    if (appointments.length === 0) {
        res.render('appointments', {userType: req.session.userType, times: null, date: date})
    } else {
        res.render('appointments', {userType: req.session.userType, times: appointments.map(i => i.time), date: date})
    }
}

exports.appointments_post = async (req, res) => {
    let data = JSON.parse(req.body.data);
    await appointmentModel.insertMany(data
        , (error, appointmentCreated) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Appointment Created Successfully as:" + appointmentCreated);
                res.redirect(`/appointments?date=${data[0].date}`)
            }
        }
    );
}