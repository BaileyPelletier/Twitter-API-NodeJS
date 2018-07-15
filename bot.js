console.log("Bot is running.")

var Twit = require('twit');

var config = require('./config');
// console.log(config)
var T = new Twit(config)


// SEARCHES TWEETS WITH T.get
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

//Adjective Array
var adj = ["adaptable",	"adventurous",	"affectionate",	"ambitious",	"amiable",	"compassionate",	"considerate",	"courageous", "courteous",	"diligent",	"empathetic",	"exuberant",
  "frank",	"generous",	"gregarious",	"impartial","intuitive","inventive", "passionate",	"persistent",	"philosophical","practical","reliable","resourceful","sensible","sincere","sympathetic","unassuming","witty"];
// Date String
var today = new Date();
function todayStr () {
  var day = today.getDate();
  var year = today.getFullYear();
  var monthNum = today.getMonth();
  var month = null;
  switch (monthNum) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      month = "(Not sure what month)";
  }
  return month + " " + day + ", " + year;
}
console.log(todayStr());


//Setting up a user stream
var stream = T.stream('user');

//Anytime someone follows/tweets bot
stream.on('follow', followed)
stream.on('tweet', reply)

function followed(eventMsg) {
  console.log("Follow Event!");
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  var index = Math.floor(Math.random()*adj.length);
  console.log(index + "  " + adj[index]);
  tweetIt("@" + screenName + ", you are so " + adj[index] + " for following me on " + todayStr() + "! Thanks!");
} //Says thanks to someone who follows bot

function reply(eventMsg) {
  // var fs = require('fs');
  // var json = JSON.stringify(eventMsg,null,2);
  // fs.writeFile("tweet.json", json);

  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;

  if (replyto === "Mr_B110") {
    var newTweet = "@" + from + " thank you kind human for tweeting me! Your timestap is " + today + "     #SkynetReplies"
  }

  tweetIt(newTweet);
}
// POSTS TWEETS
// tweetIt();
// setInterval(tweetIt, 1000*20);    //Sets an interval in which tweets (tweetIt) are executed

function tweetIt(txt) {
  var r = Math.floor(Math.random()*100);

  if (txt) {
    var tweet = {
      status: txt
    }
  }

  T.post('statuses/update', tweet , tweeted);

  function tweeted(err, data, response) {
    console.log("I tweeted: " + txt);
  }
}
