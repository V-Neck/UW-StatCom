const express = require('express')
const http = require('http');
const favicon = require('serve-favicon');
const path    = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require("fs");
const server = express();
const creds = JSON.parse(fs.readFileSync("cred.js"));

const hostname = 'vneck.lan';
const port = 1024;

var send = require("gmail-send")({
    user: creds['user'],
    pass: creds['pass'],
    to  : creds['user'],
    subject: "STATCOM",
    text: ""
});

server.use(favicon(path.join('www','images','logo.png')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())

server.use(express.static('www'))
server.use(express.static('www/pages'))
server.use(express.static('www/*'))

server.get('/', (req, res) =>
    res.send('root')
);

server.post('*/register', function(req, res){
    form_data = req['body'];
    console.log(form_data);
});


server.listen(port,
    function(){}    
);

