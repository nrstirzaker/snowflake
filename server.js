var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var firebase = require("firebase");
const extConfig = require('./config/config.json');

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8080; // set our port



var config = {
	apiKey: process.env.API_KEY || extConfig.apiKey,
	authDomain: process.env.AUTH_DOMAIN || extConfig.authDomain
};

firebase.initializeApp(config);

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/api', function (req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});


router.post('/api/register', function (req, res) {
	const email = req.body.username;
	const password = req.body.password;
	const auth = firebase.auth();

	const promise = auth.createUserWithEmailAndPassword(email, password);
	promise.catch(e => {
		console.log(e);
		res.json({ result: 'registered'})}
	).then(a => {
		//console.log(a);
		res.json({ result: a });
	});
});

router.get('/my-health', function (req, res) {
	res.json({ message: 'F.A.B' });
});



// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);