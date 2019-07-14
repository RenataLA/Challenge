const NaturalLanguageUnderstanding = require('watson-developer-cloud/natural-language-understanding/v1');

class NLUController{
    constructor(){
        this.nlu;
    }

    init(){
        try {
            this.nlu = new NaturalLanguageUnderstanding({
                version: '2018-11-16',
                iam_apikey: process.env.NLU_URL,
                url: process.env.NLU_KEY
            });
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async analyze(content){
        try {
            await this.init();
            const params = {
                text: content,
                content_type: 'text/plain',
                language: 'pt',
                features: {
                    entities: {
                        sentiment: true
                    },
                    sentiment: {},
                    categories: {},
                    keywords: {}
                }
            }
            return new Promise((resolve, reject) => {
                this.nlu.analyze(params, (err, result) => {
                    if(err) {
                        return reject(err);
                    } else {
                        return resolve(result);
                    }
                });
            });
        } catch(err) {
            return Promise.reject(err);
        }
    }
}
module.exports = new NLUController()