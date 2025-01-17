const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

dotenv.config({ path: './.env'})

//import database 
// const db = require('./db');

// db.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('Connected');
// });

//initiate express
const app = express();

//to grab data from forms- parsing url encoded bodies as sent by html forms
app.use(express.urlencoded({ extended: false}));

//Values that we grab from form comes as JSON
app.use(express.json());

//Add routes
const mainRoutes = require('./routes/mainRoutes');
const user = require('./routes/user');

//Register View engine
app.set('view engine', 'ejs');

//Add sessions
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// //static files
app.use(express.static('views'));

//use fileupload
app.use(fileUpload());

//Use routes
app.use(mainRoutes);
app.use('/user', user);

//listen for requests
app.listen(3000);
console.log("App listening on http://localhost:3000/")

// 404
app.use((req, res) => {
    //res.send('<p>about</p>');
    res.status(404).render('404', { title: '404'});
});