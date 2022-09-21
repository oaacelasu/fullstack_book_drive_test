
const express = require('express');
const app = express();
const port = 5500;

app.get('/', (req, res) => {
    res.send("<body bgcolor=#3e4449 <h1 style='color: white'>Welcome to Home page!</h1></body>");

});
app.get('/g', (req, res) => {
    res.send("<body bgcolor=#3e4449 ><h1 style='color: white'>G License</h1></body>");
});

app.get('/g2', (req, res) => {
    res.send("<body bgcolor=#3e4449><h1 style='color: white'>G2 License</h1></body>");
});

app.get('/dashboard', (req, res) => {
    res.send("<body bgcolor=#3e4449><h1 style='color: white'>Dashboard</h1></body>");
});

app.get('/login', (req, res) => {
    res.send("<body bgcolor=#3e4449><h1 style='color: white'>Login</h1></body>");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});