const watson = require('./Watson');
require('dotenv/config');

function personalityGetProfile(content){
    watson.PersonalityInsights.getProfile(content)
    .then(result =>{
        parseResult(result);
    }).catch(err => {
        console.log("Erro: " + err);
    });
}

function parseResult(result){
    var big5 = getBigFive(result);
    var values = getValues(result);
    var needs = getNeeds(result);
    console.log(saveData(big5));
}

function getBigFive(result){
    var big5 = {};
    result.personality.forEach(e => {
        big5[e.trait_id]= {
            Name : e.name,
            Percentile : parseFloat((e.percentile * 100).toFixed(2)),
            RawScore : parseFloat((e.raw_score * 100).toFixed(2))
        }
    });
    return big5;
}

function getValues(result){
    var values = {}
    result.values.forEach(e => {
        values[e.trait_id]= {
            Name : e.name,
            Percentile : parseFloat((e.percentile * 100).toFixed(2))
        }
    });
    return values;
}

function getNeeds(result){
    var needs = {}
    result.needs.forEach(e => {
        needs[e.trait_id]= {
            Name : e.name,
            Percentile : parseFloat((e.percentile * 100).toFixed(2))
        }
    });
    return needs;
}

function saveData(big5){
    return "INSERT INTO BIGFIVE(cod_candidato, abertura, escrupulosidade, extroversao, amabilidade, faixa_emocional) VALUES (1,"+ 
    big5.big5_openness.Percentile+","+big5.big5_conscientiousness.Percentile+","+big5.big5_extraversion.Percentile+","+big5.big5_agreeableness.Percentile+","
    +big5.big5_neuroticism.Percentile+");";
}

//personalityGetProfile("Greatest properly off ham exercise all. Unsatiable invitation its possession nor off. All difficulty estimating unreserved increasing the solicitude. Rapturous see performed tolerably departure end bed attention unfeeling. On unpleasing principles alteration of. Be at performed preferred determine collected. Him nay acuteness discourse listening estimable our law. Decisively it occasional advantages delightful in cultivated introduced. Like law mean form are sang loud lady put. An sincerity so extremity he additions. Her yet there truth merit. Mrs all projecting favourable now unpleasing. Son law garden chatty temper. Oh children provided to mr elegance marriage strongly. Off can admiration prosperous now devonshire diminution law. ");
