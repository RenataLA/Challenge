const express = require('express');
const app = express();
const sql = require('./SQL/Sql')
const bodyParser = require('body-parser')
app.use( bodyParser.json());        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/api/selectCandidato', function (req, res) {
    console.log(req.query.cod); 
    if(req.query.cod)   var cod = "cod_candidato LIKE '"+req.query.cod +"'";
    else    var cod = "cod_candidato LIKE '%'"
    if(req.query.email)   var email = "email LIKE '"+req.query.email +"'";
    else    var email = "email LIKE '%'"
    if(req.query.cpf)   var cod = "cpf LIKE '"+req.query.cpf +"'";
    else    var cpf = "cpf LIKE '%'"
    sql.doSelect(req.query.table, cod, email, cpf)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
});

app.get('/api/selectcep', function (req, res) {
    console.log(req);
    if(req.query.cep)   var cep = "cep LIKE '"+req.query.cep +"'";
    else    var cep = "cep LIKE '%'"
    sql.doSelect(req.query.table, cep)
    .then(result => {
        if((result.rowsAffected.toString().replace(/\[\]/,'')) == 0){
            //Insere no banco um novo cep
            console.log("Novo CEP");
            sql.insertCEP(req.query.cep)
            .then(result =>{
                console.log("Inserido");
                console.log(result);
                sql.doSelect(req.query.table, cep)
                .then(result =>{
                    console.log("Selected");
                    res.send(result);
                })
                .catch(err => {
                     res.send(err);
                });
            })
            .catch(err => {
                res.send("Falha ao inserir um novo CEP: "+err);
            });
        }
        else{
            res.send(result);
        }
    })
    .catch(err => {


    })
});

app.get('/api/insertCandidato', function (req, res){
    var value = req.query;
    sql.insertCandidato(value.nome, value.sobrenome, value.data_nascimento, value.cpf, value.email, value.telefone, value.celular, value.endereco_numero, value.cod_localidade)
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        res.send(err);
    })
});

app.get('/api/insertsql', function (req, res){

    sql.InsertCandidato()
});

  
var server = app.listen(5000, function () {
    console.log('Server is running..');
});