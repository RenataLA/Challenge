const Watson = require('../Watson');
var multer = require('multer')
var cors = require('cors')
const sql = require('../SQL/Sql')
const pdfToTxt = require('../Handlers/PdfToText');
const Twitter = require('../Twitter/Twitter');

function getPersonalityValues(res, cod_candidato){
    var bigfive =  {
        "abertura" : ((res.personality[0].percentile * 100)),
        "escrupulosidade" : ((res.personality[1].percentile * 100)),
        "extroversao" : ((res.personality[2].percentile * 100)),
        "amabilidade" : ((res.personality[3].percentile * 100)),
        "faixa_emocional" : ((res.personality[4].percentile * 100)),
        "cod_candidato" : cod_candidato
    }
    var needs = {
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
        "cod_candidato" : cod_candidato
    }
    values = {
        "conservacao" : ((res.values[0].percentile * 100)),
        "abertura_mudanca" : ((res.values[1].percentile * 100)),
        "hedonismo" : ((res.values[2].percentile * 100)),
        "autocrescimento" : ((res.values[3].percentile * 100)),
        "autotranscendencia" : ((res.values[4].percentile * 100)),
        "cod_candidato" : cod_candidato
    }
    return {bigfive, needs, values}
}


module.exports = {
    root: '/api/personality',
    routes: (route) => {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {cb(null, './Uploads/')},
            filename: function (req, file, cb) {cb(null, Date.now() + '-' +file.originalname )}
        });
        var upload = multer({ storage: storage }).single('file');
        
        route.post('/upload', function(req, res) {
            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    console.log("Error : " + err)
                    return res.status(500).json(err)
                } else if (err) {
                    console.log(err)
                    return res.status(500).json(err)
                }
                pdfToTxt(req.file.filename)
                .then(text => {
                    var cv = text;
                    console.log(req.body.twitter);
                    Twitter.fetchTweets(req.body.twitter)
                    .then(res => cv += res)
                    .then(data => Watson.PersonalityInsights.getProfile(data))
                    .then(resultPersonality => getPersonalityValues(resultPersonality, req.body.cod_candidato))
                    .then(parsedValues => {
                        sql.doInsert("PI_BIGFIVE", parsedValues.bigfive)
                        .then(res => sql.doInsert("PI_NEEDS", parsedValues.needs)
                        .then(res => sql.doInsert("PI_VALUES", parsedValues.values)
                        .then(res => {
                            console.log("Inserted");
                            console.log(res);
                        })
                        .catch(err => {
                            console.log(err);
                        })));
                    })
                    .catch(err => {
                        console.log(err);
                    }) 
                })
                .catch(err => {
                    console.log(err);
                })
                return res.status(200).send(req.file)
            })
        });
        return route;
    }
}

                // pdfToTxt(req.file.filename)
                // .then(text => {
                //     Watson.PersonalityInsights.getProfile(text)
                //     .then(res => {
                //         var teste = getPersonalityValues(res, req.body.cod_candidato);
                //         console.log(teste);
                //         // var bigfive = {
                //         //     "values": {
                //         //         "abertura" : ((res.personality[0].percentile * 100)),
                //         //         "escrupulosidade" : ((res.personality[1].percentile * 100)),
                //         //         "extroversao" : ((res.personality[2].percentile * 100)),
                //         //         "amabilidade" : ((res.personality[3].percentile * 100)),
                //         //         "faixa_emocional" : ((res.personality[4].percentile * 100)),
                //         //         "cod_candidato" : req.body.cod_candidato
                //         //     }
                //         // }
                //         // var needs = {
                //         //     "values" : {
                //         //         "desafio" : ((res.needs[0].percentile * 100)),
                //         //         "retraimento" : ((res.needs[1].percentile * 100)),
                //         //         "curiosidade" : ((res.needs[2].percentile * 100)),
                //         //         "empolgacao" : ((res.needs[3].percentile * 100)),
                //         //         "harmonia" : ((res.needs[4].percentile * 100)),
                //         //         "ideal" : ((res.needs[5].percentile * 100)),
                //         //         "liberdade" : ((res.needs[6].percentile * 100)),
                //         //         "amor" : ((res.needs[7].percentile * 100)),
                //         //         "natureza_pratica" : ((res.needs[8].percentile * 100)),
                //         //         "expressao_personalidade" : ((res.needs[9].percentile * 100)),
                //         //         "estabilidade" : ((res.needs[10].percentile * 100)),
                //         //         "estrutura" : ((res.needs[11].percentile * 100)),
                //         //         "cod_candidato" : req.body.cod_candidato
                //         //     }
                //         // }
                //         // var values = {
                //         //     "values" : {
                //         //         "conservacao" : ((res.values[0].percentile * 100)),
                //         //         "abertura_mudanca" : ((res.values[1].percentile * 100)),
                //         //         "hedonismo" : ((res.values[2].percentile * 100)),
                //         //         "autocrescimento" : ((res.values[3].percentile * 100)),
                //         //         "autotranscendencia" : ((res.values[4].percentile * 100)),
                //         //         "cod_candidato" : req.body.cod_candidato
                //         //     }
                //         // }
                //         // sql.doInsert("PI_BIGFIVE", bigfive.values)
                //         // .then(res => {
                //         //     console.log("INSERT PI bigfive")
                //         //     console.log(res);
                //         //     sql.doInsert("PI_NEEDS", needs.values)
                //         //     .then(res => {
                //         //         console.log("INSERT PI NEEDS")
                //         //         console.log(res);
                //         //         sql.doInsert("PI_VALUES", values.values)
                //         //         .then(res => {
                //         //             console.log("INSERT PI values")
                //         //             console.log(res);
                //         //         })
                //         //         .catch(err => {
                //         //             console.log(err);
                //         //         });
                //         //     })
                //         //     .catch(err => {
                //         //         console.log(err);
                //         //     });
                //         // })
                //         // .catch(err => {
                //         //     console.log(err);
                //         // });
                //     })
                //     .catch(err => {
                //         console.log(err);
                //     });
                // })
                // .catch(err => {
                //     Console.log("Erro");
                //     console.log(err);
                // });