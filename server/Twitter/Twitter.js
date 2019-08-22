var Twit = require('twit')
require('dotenv/config');

class TwitterController{
  constructor(){
    this.twitter = new Twit({
      consumer_key:         process.env.TWITTER_CONSUMER_KEY,
      consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
      access_token:         process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
      timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
      strictSSL:            true,     // optional - requires SSL certificates to be valid.
    });;
  }
  
  example(){
    this.twitter.get('search/tweets', { q: 'example since:2011-07-11', count: 100 }, function(err, data, response) {
      console.log(data)
    });
  }

  fetchTweets(username){
    return new Promise((resolve, reject) => {
      let params = {
        screen_name: username,
        count: 200,
        include_rts: false,
        trim_user: true,
        exclude_replies: true,
        tweet_mode: "extended"
      };
      let tweets = [];
  
      const fetchTweets = (error, newTweets) => {
        if (error) {
          reject(Error(error));
        }        
       // Filter out tweets with only relevant info
       var filteredTweets = newTweets.map(function (tweet) {
          return tweet.full_text.replace('[^(\\x20-\\x7F)]*', '')
          // return {
          //   //id: tweet.id_str,
          //   //language: tweet.lang,
          //   //contenttype: 'text/plain',
          //   content: tweet.full_text.replace('[^(\\x20-\\x7F)]*', ''),
          //   //created: Date.parse(tweet.created_at),
          //   //reply: tweet.in_reply_to_screen_name != null
          // };
        });
        // // check if tweets are actually retrieved and get more tweets if yes.
        if (newTweets.length > 1) {
          tweets = tweets.concat(filteredTweets);
          params.max_id = tweets[tweets.length - 1].id - 1;
          this.twitter.get('statuses/user_timeline', params, fetchTweets);
        } else {
          // if there are no more tweets to retrieve, return already retrieved tweets
          resolve(tweets);
        }
      };
      this.twitter.get('statuses/user_timeline', params, fetchTweets);
    });
  };

}

module.exports = new TwitterController();