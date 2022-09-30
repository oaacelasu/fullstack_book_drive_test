
const path = require('path');

const dashboard = (req, res) => {
    //res.sendFile(path.join(process.cwd(), './public/dashboard.html'));
    res.render('dashboard');
}

const g = (req, res) => {
    //res.sendFile(path.join(process.cwd(), './public/g.html'));
    res.render('g');
};

const g2 = (req, res) => {
    //res.sendFile(path.join(process.cwd(), './public/g2.html'));
    res.render('g2');
};

const login = (req, res) => {
    //res.sendFile(path.join(process.cwd(), './public/login.html'));
    res.render('login');
};

module.exports = {g, g2, login, dashboard};