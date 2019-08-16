const Twitter = require('twitter');

const consumerkey='ZIJoQoOePZ9JZt3lzGo9njlez';
const consumersecret='c35OC8uSoXfgA1PZaED3wSllIAmhx6VjIJwOkTdru6EkiR2EaZ';
const accesstokenkey='3102142287-aQBMdlh1h4bq5B0tCGeLW15i9Enhw1krQ9S7Rq9';
const accesstokensecret='JhxVPf4gFh2RK8isKV4H4Ra2gqFhMEqk9JFnJgOvjiMFd';
  // consumer_key: process.env.TWITTER_CONSUMER_KEY,
  // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  // access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

const client = new Twitter({
  consumer_key='ZIJoQoOePZ9JZt3lzGo9njlez',
  consumer_secret='c35OC8uSoXfgA1PZaED3wSllIAmhx6VjIJwOkTdru6EkiR2EaZ',
  access_token_key='3102142287-aQBMdlh1h4bq5B0tCGeLW15i9Enhw1krQ9S7Rq9',
  access_token_secret='JhxVPf4gFh2RK8isKV4H4Ra2gqFhMEqk9JFnJgOvjiMFd'
});

console.log(process.env.TWITTER_CONSUMER_KEY)

const fetchTweets = (username) => {
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
      console.log(newTweets);
      
      // Filter out tweets with only relevant info
      // filteredTweets = newTweets.map(function (tweet) {
      //   return {
      //     id: tweet.id_str,
      //     language: tweet.lang,
      //     contenttype: 'text/plain',
      //     content: tweet.full_text.replace('[^(\\x20-\\x7F)]*', ''),
      //     created: Date.parse(tweet.created_at),
      //     reply: tweet.in_reply_to_screen_name != null
      //   };
      // });
      // check if tweets are actually retrieved and get more tweets if yes.
      if (newTweets.length > 1) {
        tweets = tweets.concat(filteredTweets);
        params.max_id = tweets[tweets.length - 1].id - 1;
        client.get('statuses/user_timeline', params, fetchTweets);
      } else {
        // if there are no more tweets to retrieve, return already retrieved tweets
        resolve(tweets);
      }
    };
    client.get('statuses/user_timeline', params, fetchTweets);

  });
};

// fetchTweets('@danielreis02')
// .then(res => {
//   console.log(res);
  
// })
// .catch(err => {
//   console.log(err);
// })

module.exports = fetchTweets;
