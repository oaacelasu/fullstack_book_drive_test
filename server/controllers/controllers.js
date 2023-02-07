exports.dashboard = (req, res) => {
    res.render('index', {userType: req.session.userType})
}