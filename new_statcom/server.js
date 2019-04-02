const express = require('express');
const fs = require('fs');
const http = require('http');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const hostname = 'vneck.lan';
const port = 1024;
const nodemailer = require("nodemailer");

var formatJSON = function(object) {
    var output = ""
    for (key in object) {
        var bold_key = "<b>" + key + "</b>"
        output += (bold_key + ": " + object[key] + "<br>");
    }

    return output
}

// Set Up OAuth and Nodemailer
var creds = JSON.parse(fs.readFileSync("creds.json"))
var mod_email = fs.readFileSync("email.txt")

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: creds
})

// Initiate Server
const app = express();

app.use("/", express.static("www"))

app.use(favicon(path.join('www','images','logo.png')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// Routing
app.get('/', (req, res) =>
    res.redirect("/pages")
);

app.post('*/register', function(req, res){
    form_data = req['body'];

    var mailOptions = {
        from: 'evilepicproductions@gmail.com', // sender address
        to: mod_email, // list of receivers
        subject: form_data['org'] + " wants to register with StatCom", // Subject line
        html: formatJSON(form_data) // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
       if(err)
         console.log(err)
       else
         console.log(info);
    });

    res.redirect('../success.html');
});

app.listen(port,
    function(){
        console.log("Server Running...")
    }
);
