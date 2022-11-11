// Express
const express = require('express');
const app = express();
const port = 5500;

// Ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// File Upload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// Middleware
const {customMiddleWare, validateUser} = require("./middlewares/middlewares.js");
app.use('/g2', customMiddleWare);
app.use('/g2', validateUser);

// Routes
const router = require('./routes/routes.js');
app.use('/', router);

// Mongoose
const dbManager = require('./controllers/db_manager.js');
dbManager.init().then(r => {
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });
    }
).catch(e => {
    console.log(e);
});