const Twitter = require('twitter');

const consumerkey='ZIJoQoOePZ9JZt3lzGo9njlez';
const consumersecret='c35OC8uSoXfgA1PZaED3wSllIAmhx6VjIJwOkTdru6EkiR2EaZ';
const accesstokenkey='3102142287-aQBMdlh1h4bq5B0tCGeLW15i9Enhw1krQ9S7Rq9';
const accesstokensecret='JhxVPf4gFh2RK8isKV4H4Ra2gqFhMEqk9JFnJgOvjiMFd';
  // consumer_key: process.env.TWITTER_CONSUMER_KEY,
  // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET


class TwitterController{
    constructor(){
        this.twitter;
    }
    
    init(){
        try {
            this.twitter = new Twitter({
                consumer_key='ZIJoQoOePZ9JZt3lzGo9njlez',
                consumer_secret='c35OC8uSoXfgA1PZaED3wSllIAmhx6VjIJwOkTdru6EkiR2EaZ',
                access_token_key='3102142287-aQBMdlh1h4bq5B0tCGeLW15i9Enhw1krQ9S7Rq9',
                access_token_secret='JhxVPf4gFh2RK8isKV4H4Ra2gqFhMEqk9JFnJgOvjiMFd'
              });
        } catch(err) {
            return Promise.reject(err);
        }
    }
}

init();
module.exports = new TwitterController();