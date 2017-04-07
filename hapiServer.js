'use strict';

const Inert = require('inert');
const Path = require('path');
const extConfig = require('./config/config.json');
var port = process.env.PORT || 8080; // set our port

var firebase = require("firebase");

const Hapi = require('hapi');
const server = new Hapi.Server({
        connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: port });

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

var config = {
    apiKey: process.env.API_KEY || extConfig.apiKey,
    authDomain: process.env.AUTH_DOMAIN || extConfig.authDomain
};

firebase.initializeApp(config);



server.route({
    method: 'POST',
    path: '/api/register',
    handler: function (req, reply) {
        console.log("step1");
        const email = req.payload.username;
        const password = req.payload.password;
        const auth = firebase.auth();
        process.stdout.write("step2");
        const promise = auth.createUserWithEmailAndPassword(email, password);
        process.stdout.write("step3");
        promise.catch(e => {
            process.stdout.write(e);
            reply({ result: 'registered' });
        }
        ).then(a => {
            //console.log(a);
            reply({ result: a });
        });
        process.stdout.write("step4");
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

