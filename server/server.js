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
            Watson.PersonalityInsights.getProfile(text)
            .then(res => {
                var bigfive = {
                    "values": {
                        "abertura" : ((res.personality[0].percentile * 100)),
                        "escrupulosidade" : ((res.personality[1].percentile * 100)),
                        "extroversao" : ((res.personality[2].percentile * 100)),
                        "amabilidade" : ((res.personality[3].percentile * 100)),
                        "faixa_emocional" : ((res.personality[4].percentile * 100)),
                        "cod_candidato" : req.body.cod_candidato
                    }
                }
                var needs = {
                    "values" : {
                        "desafio" : ((res.needs[0].percentile * 100)),
                        "retraimento" : ((res.needs[1].percentile * 100)),
                        "curiosidade" : ((res.needs[2].percentile * 100)),
                        "empolgacao" : ((res.needs[3].percentile * 100)),
                        "harmonia" : ((res.needs[4].percentile * 100)),
                        "ideal" : ((res.needs[5].percentile * 100)),
                        "liberdade" : ((res.needs[6].percentile * 100)),
                        "amor" : ((res.needs[7].percentile * 100)),
                        "natureza_pratica" : ((res.needs[8].percentile * 100)),
                        "expressao_personalidade" : ((res.needs[9].percentile * 100)),
                        "estabilidade" : ((res.needs[10].percentile * 100)),
                        "estrutura" : ((res.needs[11].percentile * 100)),
                        "cod_candidato" : req.body.cod_candidato
                    }
                }
                console.log(needs);
                sql.doInsert("PI_BIGFIVE", bigfive.values)
                .then(res => {
                    console.log("INSERT PI bigfive")
                    console.log(res);
                    sql.doInsert("PI_NEEDS", needs.values)
                    .then(res => {
                        console.log("INSERT PI NEEDS")
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
      return res.status(200).send(req.file)
    })
});

app.get('/api/selectCandidato', function (req, res) {
    if(req.query.cod)   var cod = "cod_candidato LIKE '"+req.query.cod +"'";
    else    var cod = "cod_candidato LIKE '%'"
    if(req.query.email)   var email = "email LIKE '"+req.query.email +"'";
    else    var email = "email LIKE '%'"
    if(req.query.cpf)   var cpf = "cpf LIKE '"+req.query.cpf +"'";
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

app.post('/api/doInsert', function (req, res){
    var table = req.body.table;
    console.log(req.body);
    //console.log(req.body.values);
    sql.doInsert(req.body.table, req.body.values)
    .then(result => {
        console.log(result);
        //res.json('User added successfully');
        //res.send(result);
        res.status(200).send("Saved to database : s"+result);

    })
    .catch(err =>{
        //res.send(err);
        console.log(err);
        res.status(400).send("unable to save to database " +err );
    });
});

app.get('/api/doSelect', function (req, res) {
    if(req.query.cod)   var cod = "cod_candidato LIKE '"+req.query.cod +"'";
    else    var cod = "cod_candidato LIKE '%'"
    console.log(cod);
    sql.doSelect(req.query.table, cod)
       .then(result =>{
           res.send(result);
       })
       .catch(err => {
            res.send(err);
    })
});

const server = app.listen(5000, function () {
    console.log('Server is running..');
});