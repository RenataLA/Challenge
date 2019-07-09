const LanguageTranslator  = require('watson-developer-cloud/language-translator/v3');

class LanguageTranslatorController{
    constructor(){
        this.watsonTranslator;
    }
    init(){
        try {
            this.watsonTranslator = new LanguageTranslator({
                version: '2018-05-01',
                iam_apikey: 'Kbm3ziZAVZst81_HQtpwVHKbpLmP03oCsbzwPy1IxFjF',
                url: 'https://gateway-wdc.watsonplatform.net/language-translator/api'
            });
            return Promise.resolve();
        } catch(err) {
            return Promise.reject(err);
        }
    }
    
    async translate(content, sourceLanguage, targetLanguage){
        try {
            await this.init();
            var params = {
                text: content,
                model_id: `${sourceLanguage}-${targetLanguage}`
            };
            return new Promise((resolve, reject) => {
                this.watsonTranslator.translate(params, (err, result) => {
                    if(result && result.translations && result.translations[0]){
                        //return resolve(result.translations[0].translation);
                        return resolve(result);
                    } else if(err) {
                        return reject(err);
                    } else {
                        return reject();
                    }
                });
            });
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async listIdentifiableLanguages(){
        try {
            await this.init();

            return new Promise((resolve, reject) => {
                this.watsonTranslator.listIdentifiableLanguages((err, result) => {
                    if(result)
                        return resolve(result);
                    else if(err)
                        return reject(err);
                    else   
                        return reject();
                });
            });
        } catch(err) {
            return Promise.reject(err);
        }
    }

    async identifyLanguage(content){
        try {
            await this.init();
            return new Promise((resolve, reject) =>{
                this.watsonTranslator.identify(content, (err, result) =>{
                    if(result)
                        return resolve(result);
                    else if(err)
                        return reject(err);
                    else
                        return reject();
                });
            })
        } catch (err) {
            return Promise.reject(err);
        }
    }
//Document translation ?
}
module.exports = new LanguageTranslatorController();