
var express = require('express');
var app = express();

app.get('/api/sql', function (req, res) {
   
    var sql = require("mssql");
    var config = {
        user: 'sa',
        password: 'Pass@word',
        server: 'localhost', 
        database: 'Challenge' 
    };
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        //where cod_candidato='+req.query.cod
        request.query('select * from Candidato where cod_candidato LIKE '+req.query.cod, function (err, recordset) {            
            if (err) {
                console.log(err);
                res.send(err);
                sql.close();
            }
            res.send(recordset);
            sql.close();
        });
    });
});

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });
  
var server = app.listen(5000, function () {
    console.log('Server is running..');
});