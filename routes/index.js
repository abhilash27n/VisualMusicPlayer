var express = require('express');
var mysql = require('mysql');
var router = express.Router();


//Creating mySQL connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'start',
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

	//execute query
	query = 'SELECT youtubeId as url from Songs where songCountry = "'+country+'" and releaseDate >= '+fromYear+' and releaseDate <= '+toYear;

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
	    	//generate randon number between 0 and number of songs
		    var rand =randomIntFromInterval(0, no_songs-1);
		    console.log("Random song selected: "+rand);
		    link = rows[rand].url;
		    res.send(JSON.stringify(link));
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
