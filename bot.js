console.log("Bot is running.")

var Twit = require('twit');

var config = require('./config');
// console.log(config)
var T = new Twit(config)

// var params = {
//   q: 'fire',
//   count: 5
// };
//
// T.get('search/tweets', params, gotData);
//
// function gotData (err, data, response) {
//   var tweets = data.statuses;
//   for (var i = 0; i < tweets.length; i++) {
//     console.log(tweets[i].text);
//     console.log(' ');
//   }
//   // console.log(data);
// };


var tweet =  {
  status: '#SkynetBooting'
}

T.post('statuses/update', tweet , tweeted);

function tweeted(err, data, response) {
  if (err) {
    console.log("Something went wrong!")
  }
  console.log("It worked!")
}
