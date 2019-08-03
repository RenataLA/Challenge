const express = require('express');
const bodyParser = require('body-parser')

const sql = require('./SQL/Sql')
var multer = require('multer')
var cors = require('cors');

const pdfToTxt = require('./Handlers/PdfToText');
const Watson = require('./Watson');

const app = express();
app.use(cors())
app.use( bodyParser.json());        // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
        pdfToTxt(req.file.filename)
        .then(text => {
            console.log(text);
            Watson.PersonalityInsights.getProfile(text)
            .then(resultPersonality => {
                console.log(resultPersonality);
            })
        })
        // .then(englishText => {
        //     Watson.PersonalityInsights.getProfile(englishText)
        // })
        // .then(resultPersonality => {
        //     console.log(resultPersonality);
        // })
        .catch(err => {
            console.log(err);
        })
        console.log(req.file.filename);

      return res.status(200).send(req.file)

    })

});

app.get('/api/selectCandidato', function (req, res) {
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

app.get('/api/selectCandidatoModify', function (req, res) {
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

app.get('/api/selectCodLocalidade', function (req, res) {
    console.log(req.query.cod)
    if(req.query.cod)   var cod = "cod_localidade LIKE '"+req.query.cod +"'";
    else    var cod = "cod_localidade LIKE '%'"
    console.log(cod);
    sql.doSelect(req.query.table, cod)
       .then(result =>{
           res.send(result);
       })
       .catch(err => {
            res.send(err);
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

const server = app.listen(5000, function () {
    console.log('Server is running..');
});