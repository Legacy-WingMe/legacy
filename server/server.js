var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var config = require('./modules/config');

// Require .env
require('dotenv').config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors
app.use(cors());

app.use(express.static('../' + config.public));
app.use('/node_modules', express.static(__dirname + 'ionic/node_modules'));



//* ---------------------------------------------
//* ---------------------------------------------


// run schema if needed:
// require('./db/config.js');


//* ---------------------------------------------
//* ---------------------------------------------


/**
 *  We use express router to set up our routes in a modular fashion.
 *
 *  Here are the various api routes for our application.
 *  take a look inside these files to get a feel for how express router works.
 *
 *  You can also look here for documentation:
 *  @url: http://expressjs.com/en/guide/routing.html#express-router
 */
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/wings', require('./routes/wings'));
app.use('/api/pairs', require('./routes/pairs'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/message', require('./routes/sms.js'));

app.listen(config.port, function () {
  console.log('The server is available at http://localhost:', config.port);
});
