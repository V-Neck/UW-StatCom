const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const hostname = 'vneck.lan';
const port = 1024;
const nodemailer = require("nodemailer");
const {google} = require('googleapis');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const sanitize = require('mongo-sanitize');

// D A T A B A S E
const url = 'mongodb://localhost:12345';
const dbName = 'Hello';
const client = new MongoClient(url);

var pushSubmission = function(table, row){
	client.connect(function(err, client) {
		const db = client.db(dbName);
		db.collection(table).insertOne(row, function(err, r) {
			client.close();
		});
	});
}

// Initiate Server
const app = express();

app.use(express.static("www"))

app.use(favicon(path.join('www', 'images','logo.png')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// Routing
app.get('/', (req, res) =>
    res.redirect("/pages")
);

app.post('*/org_register', function(req, res){
    console.log(req.body);
    pushSubmission('clients', sanitize(req.body))
    res.redirect('../success.html');
});

app.post('*/vol_register', function(req, res){
    pushSubmission('volunteers', sanitize(req.body)) 
    res.redirect('../success.html');
});

app.listen(port,
    function(){
        console.log("Server Running...")
    }
);
