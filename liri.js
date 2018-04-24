require('dotenv').config();

const keys = require ("./keys.js");

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var inputCommand = (process.argv[2]);
var inputSearchTerm = (process.argv[3]);

//Twitter
const getTweets = function(){
    twitter.get('statuses/user_timeline',  function(error,tweets){
        if(!error)
          for (i=0; i <4; i++){
            console.log('[' + tweets[i].created_at + ']   '+ tweets[i].text);
          }
        else return console.log('error:' + err);
    });
}

//Spotify
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

//IMDB (movies)
const getMovie = function(){
  if (inputSearchTerm){
    request(`http://www.omdbapi.com/?t=${inputSearchTerm}&apikey=trilogy&`, function (error, response, body) {
      if (!error){
        let info = JSON.parse(body);
        console.group(info.Title);
        console.log("Year: " + info.Year);
        console.log("IMDB Rating: "+info.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: "+info.Ratings[1].Value);
        console.log("Produced in: "+info.Country);
        console.log("Language: "+info.Language);
        console.log("Plot: "+info.Plot);
        console.log("Actors: "+info.Actors);
        console.groupEnd();
      }  
      else {console.log("Error");}
    })
  }
  else {
    request('http://www.omdbapi.com/?t=Mr.Nobody&apikey=trilogy&', function (error, response, body) {
      let info2 = JSON.parse(body);
      console.log(`If you haven't watched "${info2.Title}, then you should: https://www.imdb.com/title/tt0485947/ \nIt's on Netflix!`);
    });
  }
};

//Do What It Says
const dwis = function(){
  fs.readFile('random.txt', 'utf8', function (err,data){
    if(!err){
      var dataArr = data.split(",");
      switch(dataArr[0]){
        case "my-tweets":
        getTweets();
        break;
      
      case "spotify-this-song":
        findSong(dataArr[1]);
        break;
      
      case "movie-this":
          getMovie();
        break;
      };
    }
    else{
      console.log(err);
    }
  })
}

//Liri Commands
  switch (inputCommand) {
      case "my-tweets":
        getTweets();
        break;
      
      case "spotify-this-song":
        findSong(inputSearchTerm);
        break;
      
      case "movie-this":
          getMovie();
        break;
      
      case "do-what-it-says":
          dwis();
        break;
      }  
