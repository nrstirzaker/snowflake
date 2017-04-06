'use strict';

const extConfig = require('./config/config.json');
var port = process.env.PORT || 8080; // set our port

var firebase = require("firebase");




const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: port, host: '0.0.0.0' });




var config = {
    apiKey: process.env.API_KEY || extConfig.apiKey,
    authDomain: process.env.AUTH_DOMAIN || extConfig.authDomain
};

firebase.initializeApp(config);

server.route({
    method: 'GET',
    path: '/index.html',
    handler: function (request, reply) {
        reply.file('./public/index.html');
    }
});

server.route({
    method: 'POST',
    path: '/api/register',
    handler: function (req, reply) {
        const email = req.payload.username;
        const password = req.payload.password;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => {
            console.log(e);
            reply({ result: 'registered' });
        }
        ).then(a => {
            //console.log(a);
            reply({ result: a });
        });
    }
});



server.register(
    {
        register: require('inert')
    }, 
    function (err) {
        if (err) throw err

        server.start(function (err) {
            console.log('Server started at: ' + server.info.uri)
        })
    }
)

