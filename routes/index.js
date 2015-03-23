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
	connection.query('SELECT count(*) as NUM_SONGS from Songs where songCountry = "'+country+'"', function(err, rows, fields) {
	if (!err){
	    console.log('The solution is: ', rows);
	    res.render('index', { no_of_songs: rows[0].NUM_SONGS });
	}
	else
	    console.log('Error while performing Query.');
	});

});

module.exports = router;
