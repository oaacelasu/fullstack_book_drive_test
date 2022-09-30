
const express = require('express');
const app = express();
const port = 5500;
app.set('view engine', 'ejs');

app.use(express.static('public'));

const router = require('./routes/routes.js');


app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});