const sql = require("mssql");
const Correios = require('node-correios');
const config = {
    user: 'sa',
    password: 'Pass@word',
    server: 'localhost', 
    database: 'BAYER_CHALLENGE' 
};

class Sql{
    doSelect(table, ...filters){
        var selectquery = "SELECT * FROM " + table;
        var aux = " WHERE "
        if(filters){
            for (var i = 0; i < filters.length; i++) {
                if(i != filters.length-1)    aux += filters[i] + " AND ";
                else    aux += filters[i];
            }    
        }
        selectquery += aux;
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
                if(err) return reject();
                var request = new sql.Request();
                request.query(selectquery, function (err, recordset) {            
                    if (err)    console.log('Erro', err);
                    sql.close();
                    resolve(recordset);
                });
            });
        })   
    }
    
    doInsert(table, values){
        var fields = Object.keys(values);
        var values = Object.values(values)
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err){
                if(err) 
                    console.log("Erro ao conectar", err);
                var request = new sql.Request();
                var aux = ""
                for (let i = 0; i < fields.length; i++) {
                    request.input(fields[i], values[i]);
                    if(i == fields.length-1)  aux += " @"+fields[i];
                    else aux += " @"+fields[i]+",";
                }
                var query = "INSERT INTO " + table + "(" + fields + ") VALUES (" + aux + ")";
                request.query(query, (err, result) =>{
                    sql.close();
                    if(err) 
                        reject(err);
                    resolve(result);
                });
            });
        });
    }


    insertCandidato(...values){
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err){
                if(err) console.log("Erro ao conectar", err);
                var request = new sql.Request();
                request.input('nome', sql.VarChar, values[0])
                request.input('sobrenome', sql.VarChar, values[1])
                request.input('data_nascimento', sql.Date, values[2])
                request.input('cpf', sql.VarChar, values[3])
                request.input('email',sql.VarChar,  values[4])
                request.input('telefone', sql.VarChar,  values[5])
                request.input('celular', sql.VarChar,  values[6])
                request.input('endereco_numero', sql.Int,  values[7]),
                request.input('cod_localidade', sql.Int, values[8]),
                request.query('INSERT INTO CANDIDATO (nome, sobrenome, data_nascimento, cpf, email, telefone, celular, endereco_numero, cod_localidade) VALUES (@nome, @sobrenome, @data_nascimento, @cpf, @email, @telefone, @celular, @endereco_numero, @cod_localidade)', (err, result) =>{
                    if(err) reject(err);
                    sql.close();
                    resolve(result);
                });
            });
        });
    }  
    
    insertCEP(cep){
        return new Promise(function (resolve, reject){
            var correios = new Correios();
            correios.consultaCEP({ cep: cep })
            .then(result => {
                if(result.Erro || result.erro){
                    reject("Falha");
                }
                else{
                    sql.connect(config, function (err){
                        if(err) console.log("Erro ao conectar", err);
                        var request = new sql.Request();
                        request.input('cep', sql.VarChar, cep)
                        request.input('bairro', sql.VarChar, result.bairro)
                        request.input('localidade', sql.VarChar, result.localidade)
                        request.input('logradouro', sql.VarChar, result.logradouro)
                        request.input('uf', sql.VarChar,  result.uf)
                        request.query('INSERT INTO LOCALIDADE (cep, bairro, localidade, logradouro, uf) VALUES (@cep, @bairro, @localidade, @logradouro, @uf)', (err, result) =>{
                            if(err) reject(err);
                            sql.close();
                            resolve(result)
                        });
                    });
                }
            })
            .catch(err =>{
                console.log("Erro : Impossivel inciar serviço de endereço. " + err);
                reject(err);
            });
        });
        
    }    
}

module.exports = new Sql();