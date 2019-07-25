const sql = require("mssql");
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
        console.log(selectquery);
        
        return new Promise(function (resolve, reject){
            sql.connect(config, function (err) {
                if(err) return reject();
                var request = new sql.Request();
                request.query(selectquery, function (err, recordset) {            
                    if (err)    console.log('Erro', err);
                    sql.close();
                    console.log(recordset);
                    resolve(recordset);
                });
            });
        })   
    }
}

module.exports = new Sql();


//  doSelect('CANDIDATO', 'cod_candidato=2')
//  .then(function(results){console.log(results)})
// var a = SelectSQL('SELECT * FROM CANDIDATO WHERE cod_candidato=1');console.log(a);
