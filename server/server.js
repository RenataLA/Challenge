const express = require('express');
const app = express();
const sql = require('./SQL/Sql')


app.get('/api/selectsql', function (req, res) {
    if(req.query.cod)   var cod = "cod_candidato LIKE '"+req.query.cod +"'";
    else    var cod = "cod_candidato LIKE '%'"
    if(req.query.email)   var email = "email LIKE '"+req.query.email +"'";
    else    var email = "email LIKE '%'"
    if(req.query.cod)   var cod = "cpf LIKE '"+req.query.cpf +"'";
    else    var cpf = "cpf LIKE '%'"

    sql.doSelect(req.query.table, cod, email, cpf)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
});


app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });
  
var server = app.listen(5000, function () {
    console.log('Server is running..');
});