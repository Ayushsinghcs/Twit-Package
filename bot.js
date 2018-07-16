var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('user');
stream.on('tweet',tweetEvent);
stream.on('follow',followed);
// stream.on('followback',follow);

// function followback(){
//   var name= eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//
// }

function followed(eventMsg){
  var name= eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  var id =eventMsg.source.id;
  tweetIt('@' + screenName+ ' Thanks for following me');

  T.post('friendships/create', { screen_name: screenName}, function(err, data, response)
    {

      console.log("you are following the user");
      break;
    });
}

function tweetEvent(eventMsg){
var replyto = eventMsg.in_reply_to_screen_name;
  var text =eventMsg.text;
  var from = eventMsg.user.screen_name;

  if(replyto==='ayush____singh'){
var newTweet = '@' + from + ' thank you for tweeting me';
tweetIt(newTweet);
console.log("you are following the user");
break;
  }
}

function tweetIt(txt){

var tweet = {
  status:txt
}
T.post('statuses/update', tweet, function(err, data, response) {
  console.log(data);
  break;
});

}
