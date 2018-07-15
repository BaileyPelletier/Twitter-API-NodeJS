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

function todayStr () {
  var today = new Date();
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

//Anytime someone follows me
stream.on('follow', followed)

function followed(event) {
  console.log("Follow Event!");
  var name = event.source.name;
  var screenName = event.source.screen_name;
  tweetIt("@" + screenName + ", you are so rad for following me on " + todayStr() + "! Thanks!");
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
  } else {
    var tweet =  {
      status: 'Here is a random number for you: ' + r + " You're welcome. #RandomNumberGeneration"
    }
  }

  T.post('statuses/update', tweet , tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wrong!")
    }
    console.log("It worked!")
  }
}
