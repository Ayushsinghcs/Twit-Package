var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('user');
// stream.on('tweet',tweetEvent);
stream.on('follow',followed);
stream.on('unfollow',unfollowed);
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
  var replyto = eventMsg.in_reply_to_screen_name;

  T.post('friendships/create', { screen_name: screenName}, function(err, data, response)
    {
         stream.stop();
      tweetIt('@' + screenName+ ' Thanks for following me, see i followed you back');


      console.log("you are following the user");
    });
}

function unfollowed(eventMsg){
  var name= eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  var id =eventMsg.source.id;
  var replyto = eventMsg.in_reply_to_screen_name;

  T.post('friendships/destroy', { screen_name: screenName}, function(err, data, response)
    {

      tweetIt('@' +screenName + ' I am gonna unfollow you now');
      // stream.stop();

      console.log("you are unfollowing the user");
    });
}
// function tweetEvent(eventMsg){
//   //var replyto =  eventMsg.source.screen_name;
//  var replyto = eventMsg.in_reply_to_screen_name;
//   var text =eventMsg.text;
//   var from = eventMsg.user.screen_name;
//
//   if(replyto===from){
// var newTweet = '@' + from + ' thank you for tweeting me';
// tweetIt(newTweet);
//
//   }
// }

function tweetIt(txt){

var tweet = {
  status:txt
}
T.post('statuses/update', tweet, function(err, data, response) {
  console.log(data);
});

}
