const PersonalityInsights = require('watson-developer-cloud/personality-insights/v3');

class PersonalityInsightsController{
    constructor(){
        this.watsonPersonalityInsights;
    }
    
    init(){
        try {
            this.watsonPersonalityInsights = new PersonalityInsights({
                iam_apikey: '9LwLgvG2pIhHJfVjGlMdNBGDF8PRsTNj8mMbfOeK5-dW',
                version: '2016-10-19',
                url: 'https://gateway.watsonplatform.net/personality-insights/api'
            });
        } catch(err) {
            return Promise.reject(err);
        }
    }
    
    async getProfile(content){
        try {
            await this.init();
            const params = {
                content: content,
                content_type: 'text/plain',
                consumption_preferences: true,
                raw_scores: true,
                accept_language: 'pt-br'
            }
            return new Promise((resolve, reject) => {
                this.watsonPersonalityInsights.profile(params, (err, result) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch(err) {
            return Promise.reject(err);
        }
    }
}
module.exports = new PersonalityInsightsController()