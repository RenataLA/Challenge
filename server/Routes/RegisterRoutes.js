const sql = require('../SQL/Sql');

module.exports = {
    root: '/api/register',
    routes: (route) => {
        route.post('/newcandidate', (req, res, next) => {
            sql.doInsert(req.body.table, req.body.values)
            .then(result => {
                console.log(result);
                res.status(200).send("Candidate successfully registered");
            })
            .catch(err =>{
                console.log(err);
                res.status(400).send("Unable to register candidate");
            });
        });
        
        route.get('/getzipcode', (req, res, next) => {
            var cep = "cep LIKE '"+req.query.cep +"'"
            sql.doSelect(req.query.table, cep)
            .then(result => {
                if((result.rowsAffected.toString().replace(/\[\]/,'')) == 0){
                    sql.registerZipCode(req.query.cep)
                    .then(result =>{
                        sql.doSelect(req.query.table, cep)
                        .then(result =>{
                            res.status(200).send(result);
                        })
                        .catch(err => {
                            res.status(400).send("Não foi possível encontrar o CEP na base de dados.");
                        });
                    })
                    .catch(err => {
                        res.status(400).send("Não foi possivel cadastrar um novo CEP. Verifique a conexão com a internet e o valor inserido.");
                    });
                }
                else{
                    res.status(200).send(result);
                }
            })
            .catch(err => {
                res.status(400).send("Não foi possível encontrar o CEP na base de dados.");
            })
        });

        
        return route;
    }
}