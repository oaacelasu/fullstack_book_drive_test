exports.validateUser = (
    req, res, next) => {
    if (req.body.firstName === '' || req.body.lastName === '' || req.body.licenseNo === '' || req.body.age === '' || req.body.make === '' || req.body.model === '' || req.body.year === '' || req.body.color === '' || req.body.plateNo === '') {
        console.log('Validation failed')
    } else {
        console.log('Validation success')
        next()
    }
}

exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        req.session.error = "You have to Login first";
        res.redirect("/");
    }
};