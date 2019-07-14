
var express = require('express');
var app = express();
var Personality = require('./index.js');

app.get('/', function (req, res) {
   
    var sql = require("mssql");


    
    // config for your database
    var config = {
        user: 'sa',
        password: 'Pass@word',
        server: 'localhost', 
        database: 'Challenge' 
    };

    
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Candidato', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});