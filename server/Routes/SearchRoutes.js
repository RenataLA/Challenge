const sql = require('../SQL/Sql');

module.exports = {
    root: '/api/search',
    routes: (route) => {
        route.get('/candidate', (req, res, next) => {
            if(req.query.cod)   var cod = "cod_candidato LIKE '"+req.query.cod +"'";
            else    var cod = "cod_candidato LIKE '%'"
            if(req.query.email)   var email = "email LIKE '"+req.query.email +"'";
            else    var email = "email LIKE '%'"
            if(req.query.cpf)   var cpf = "cpf LIKE '"+req.query.cpf +"'";
            else    var cpf = "cpf LIKE '%'"
            console.log(cpf);
            sql.doSelect(req.query.table, cod, email, cpf)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            })
        });

        route.get('/personality', (req, res, next) => {
            if(req.query.cod)   var cod = "cod_candidato LIKE '"+req.query.cod +"'";
            else    var cod = "cod_candidato LIKE '%'";
            sql.doSelect(req.query.table, cod)
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            })
        });
        
        route.get('/address', function (req, res) {
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
        
        return route;
    }
}