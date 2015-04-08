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
	topSongsPercent = 10;

	//execute query
	if(options==="Random") {
		query = 'SELECT youtubeId as url, songName, songCountry, songLanguage, releaseDate from Songs where songCountry = "'+country+'" and releaseDate >= '+fromYear+' and releaseDate <= '+toYear;
	}
	else if (options==="TopArtists") {
		query = "SELECT song.youtubeId as url, song.songName, song.songCountry, song.songLanguage, song.releaseDate, artist.artistName from Songs song, Artists artist, (select artistId, sum(viewCount) TotalViews from Songs where songCountry='"+country+"' and releaseDate >= '"+fromYear+"' and releaseDate <= '"+toYear+"' group by artistId order by TotalViews desc limit 1) topArtist where song.artistId=topArtist.artistId and topArtist.artistId=artist.artistId";	
		console.log(query);
	}
	else if (options=="TopSongs") {
		query = 'SELECT youtubeId as url, songName, songCountry, songLanguage, releaseDate from Songs where songCountry = "'+country+'" and releaseDate >= '+fromYear+' and releaseDate <= '+toYear+' order by viewCount desc';
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
	    console.log('Error while performing Query.');
	});

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