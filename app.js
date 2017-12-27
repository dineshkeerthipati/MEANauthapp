const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

//On Database connection
mongoose.connection.on('connected', () => {
   console.log('Connected to database ' + config.database)
    }
);

//On DB error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err)
    }
);

const app = express();

const users = require('./routes/users');

//Port number
const port = 3000;

//CORS middleware
app.use(cors());

//Set Static folder.........this is the location where we put our front-end code
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//redirects to the routes/users.js file when end user enters
app.use('/users', users);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid End pont');
});

//Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});