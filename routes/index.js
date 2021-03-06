var express = require('express');
var mysql = require('mysql');
var router = express.Router();


//Creating mySQL connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Database_Project_DB'
});

var statConnection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'Database_Project_DB'
});


/* GET home page. */
router.get('/', function(req, res, next) {

	//defaults
	var link = "";
	var no_songs = "NA";
	var country = "None";
	var fromYear = 1900;
	var toYear = 2015;

	res.render('index', {youtube_link: link, no_of_songs: no_songs, country_name: country, from_year: fromYear, to_year: toYear});
});

router.post('/', function(req, res){
	//POST REQUEST
	var country = req.body.country;
	var fromYear = req.body.fromYear;
	var toYear = req.body.toYear;
	var options = req.body.options;
	var youtubeIdRec = req.body.youtubeId;
	var chartRequest = false;
	//if country data not received, then request has come for chart
	if(country == undefined){
		country = req.body.country2
		chartRequest = true;
	}

	topSongsPercent = 10;
	bottomSongsPercent = 10;

	if(chartRequest == false){
		console.log("===================SONG REQUEST===================");
		//execute query
		if(options==="Random") {
			query = 'SELECT youtubeId as url, songName, songCountry, songLanguage, releaseDate from Songs where songCountry = "'+country+'" and releaseDate >= '+fromYear+' and releaseDate <= '+toYear;
			console.log("Random song selection");
			console.log(query);
		}
		else if (options==="TopArtists") {
			query = "SELECT song.youtubeId as url, song.songName, song.songCountry, song.songLanguage, song.releaseDate, artist.artistName from Songs song, Artists artist, (select artistId, sum(viewCount) TotalViews from Songs where songCountry='"+country+"' and releaseDate >= '"+fromYear+"' and releaseDate <= '"+toYear+"' group by artistId order by TotalViews desc limit 1) topArtist where song.artistId=topArtist.artistId and topArtist.artistId=artist.artistId";	
			console.log("Top Artist selection");
			console.log(query);
		}
		else if (options=="TopSongs") {
			query = 'SELECT youtubeId as url, songName, songCountry, songLanguage, releaseDate from Songs where songCountry = "'+country+'" and releaseDate >= '+fromYear+' and releaseDate <= '+toYear+' order by viewCount desc';
			console.log("Top Song selection");
			console.log(query);
		}
		else if (options==="BottomArtists") {
			query = "SELECT song.youtubeId as url, song.songName, song.songCountry, song.songLanguage, song.releaseDate, artist.artistName from Songs song, Artists artist, (select artistId, sum(viewCount) TotalViews from Songs where songCountry='"+country+"' and releaseDate >= '"+fromYear+"' and releaseDate <= '"+toYear+"' group by artistId order by TotalViews asc limit 1) topArtist where song.artistId=topArtist.artistId and topArtist.artistId=artist.artistId";	
			console.log("Bottom Artist selection");
			console.log(query);
		}
		else if (options=="BottomSongs") {
			query = 'SELECT youtubeId as url, songName, songCountry, songLanguage, releaseDate from Songs where songCountry = "'+country+'" and releaseDate >= '+fromYear+' and releaseDate <= '+toYear+' order by viewCount asc';
			console.log("Bottom Song selection");
			console.log(query);
		}
		else if (options=="Recommend") {
			query = 'SELECT s.youtubeId as url, s.songName, s.songCountry, s.songLanguage, s.releaseDate from Songs s, (select ge.youtubeId from GenreRecommend ge, (select id-3 as low,id+3 as high from GenreRecommend where youtubeID = "'+youtubeIdRec+'") idsel where ge.id>idsel.low and ge.id<idsel.high and ge.youtubeId <> "'+youtubeIdRec+'") recSongs where s.youtubeId=recSongs.youtubeId';

			console.log("Recommending a song");
			console.log(query);
		}


		connection.query(query, function(err, rows, fields) {
		if (!err){
		    //console.log('The solution is: ', rows)
		    no_songs = rows.length;
		    console.log("No of songs returned: "+no_songs);
		    if(no_songs == 0){
		    	//No songs returned
		    	res.send(JSON.stringify("NoSongsReturned"));
		    }
		    else{
		    	//get top n% of songs
		    	if(options=="TopSongs"){
		    		no_songs=no_songs/(100/topSongsPercent);
		    		console.log("No of songs reduced to "+no_songs);
		    	}
		    	//get bottom n% of songs
		    	if(options=="BottomSongs"){
		    		no_songs=no_songs/(100/bottomSongsPercent);
		    		console.log("No of songs reduced to "+no_songs);
		    	}
		    	//generate randon number between 0 and number of songs
			    var rand =randomIntFromInterval(0, no_songs-1);
			    console.log("Random song selected: "+rand);
			    link = rows[rand].url;
			    songDetails = rows[rand];
			    console.log(JSON.stringify(songDetails));
			    res.send(JSON.stringify(songDetails));
		   }
		    
		}
		else
		    console.log('Error while performing song request query.');
		});
	} else if(chartRequest == true){
		console.log("===================CHART REQUEST===================");
		query = 'SELECT name as genreName, numSongs from GenreStats where songCountry ="'+country+'"';
		console.log("Stat Query:"+query);
		statConnection.query(query, function(err, rows, fields) {
		if (!err){
		    no_genres = rows.length;
		    console.log("No of Genres returned: "+no_genres);
			genreData = rows;
			console.log(JSON.stringify(genreData));
			res.send(JSON.stringify(genreData));
	   }
	   else
		    console.log('Error while performing chart request query.');
	});
	}

});


process.on( 'SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  connection.end();
  process.exit( );
})


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
module.exports = router;