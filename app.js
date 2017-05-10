const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config/database');



//Connect to Database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database : '+config.database);
});

mongoose.connection.on('error', (err) => {
	console.log('Database Error :' +err);
});


const app = express();

const users = require('./routes/users');


//Logging Middleware
app.use(morgan('dev'));

//Port Number
const port = process.env.PORT || 8080;

//CORS Middleware
app.use(cors());


//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));



//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);


// Index Route
app.get('/', (req, res) => {
	res.send('This is Mean Stack');
});


app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname,'public/index.html'));
});


//Start Server
app.listen(port, () => {
	console.log('Server starterd on Port: '+ port);
});
