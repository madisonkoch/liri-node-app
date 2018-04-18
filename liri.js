require('dotenv').config();

const keys = require ("./keys.js");

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


//Retrieve Tweets
const getTweets = function(){
    twitter.get('statuses/user_timeline',  function(error,tweets){
        if(!error)
            console.log(tweets);
    });
}


//Retrieve Spotify


//Liri Commands
var inputCommand = (process.argv[2]);

switch (inputCommand) {
    case "my-tweets":
      getTweets();
      break;
    
    case "spotify-this-song":
      console.log('spots');
      break;
    
    case "movie-this":
        console.log('movie');
      break;
    
    case "do-what-it-says":
        console.log('dooit');
      break;
    }
    





