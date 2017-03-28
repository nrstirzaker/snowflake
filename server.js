var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var path    = require("path");

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/api', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


router.get('/my-health', function(req, res) {
	res.json({ message: 'F.A.B' });	
});

router.get('/web', function(req, res) {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);