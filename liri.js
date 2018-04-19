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
          for (i=0; i <4; i++){
            console.log('[' + tweets[i].created_at + ']   '+ tweets[i].text);
          }
        else return console.log('error:' + err);
    });
}

//Retrieve Spotify
/**
 * 
 * @param {string} thisSong 
 */
const findSong = function(thisSong){
  if (thisSong){
    spotify.search({type:'track', query:thisSong, limit:1}, function(err,song){
      if (!err){
        console.log(`Artist: ${song.tracks.items[0].album.artists[0].name}`);
        console.log(`Song: ${song.tracks.items[0].name}`);
        console.log(`Preview Link: ${song.tracks.href}`);
        console.log(`Album: ${song.tracks.items[0].album.name}`);
      }
      else console.log('error: '+err);
  })
  }
  else {
    spotify.search({type:'track,artist', query:'the sign, ace of base', limit:1}, function(err,song){
      if (!err){
        console.log(`Artist: ${song.tracks.items[0].album.artists[0].name}`);
        console.log(`Song: ${song.tracks.items[0].name}`);
        console.log(`Preview Link: ${song.tracks.href}`);
        console.log(`Album: ${song.tracks.items[0].album.name}`);
      }
      else console.log('error: '+err);
  })
  }
}

//Liri Commands
var inputCommand = (process.argv[2]);
var inputSearchTerm = (process.argv[3])

switch (inputCommand) {
    case "my-tweets":
      getTweets();
      break;
    
    case "spotify-this-song":
      findSong(inputSearchTerm);
      break;
    
    case "movie-this":
        console.log('movie');
      break;
    
    case "do-what-it-says":
        console.log('dooit');
      break;
    }
    





