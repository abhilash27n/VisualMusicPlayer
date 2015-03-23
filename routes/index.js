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
	res.render('index', {});
});

router.post('/', function(req, res){
	//res.send('COUNTRY SUBMITTED')
	var country = req.body.country;
	//execute query
	query1 = 'SELECT count(*) as NUM_SONGS from Songs where songCountry = "'+country+'"';
	query2 = 'SELECT youtubeId as url from Songs where songCountry = "'+country+'" LIMIT 1';
	//connection.query(query1, function(err, rows, fields) {
	// if (!err){
	//     console.log('The solution is: ', rows);
	//     res.render('index', { no_of_songs: rows[0].NUM_SONGS });
	// }
	// else
	//     console.log('Error while performing Query.');
	// });
	connection.query(query2, function(err, rows, fields) {
	if (!err){
	    console.log('The solution is: ', rows);
	    link = rows[0].url;
	    res.render('index', { youtube_link: link });
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

module.exports = router;
