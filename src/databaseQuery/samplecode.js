const express = require('express');
var mongoClient = require('mongodb').MongoClient;
//var helmet = require('helmet');
const cookieParser = require('cookie-parser');
const assert = require('assert');
var app = express();
//app.use(helmet);
//TODO in future we will want secret for our cookie parser to make it more secure
app.use(cookieParser());
var url = 'mongodb://localhost:27017/representedDB';
var db;

//use this to connect to our mongoDB

mongoClient.connect(url, (error, database) => {
	assert.equal(null, error);
	db = database;
});


//example query

app.get('/', (req, res) => {
	var currCookie = req.cookies.represented506zip;
	if(currCookie === undefined){
		//SEND TO WELCOME PAGE TO GET ZIP CODE
		res.cookie('represented506zip', '53005', {maxAge: 1000000});
		res.send('hello');
		//TODO make new cookie, direct to welcome
	}
	else {
		//USE COOKIE TO QUERY DB
		//TODO GET CORRECT COLLECTION NAME (legislation, districts, representatives)
		var districtCollection = db.collection('districts', {},
		(error, collection) => {
			assert.equal(null, error); //Didn't successfully find scheme
		});
		var repArray = [];
		var zipCodeLookup = districtCollection.find({zipcodes: {$in:[currCookie/*currCookieTODO GET ZIPCODE FROM COOKIE OR OTHER*/ ]}}).toArray((error, results) => {
			//TODO check that the zipcode gets mapped somewhere
			//some zip codes have more than one district
			results.forEach(function(record){
				var repCollection = db.collection('representatives', {},
				(error, collection) => {
					assert.equal(null, error);
				});
				//look up house member for that district
				var houseLookup = repCollection.find({state: record.state, district: record.district, chamber: "house"}).toArray(
				(error, result) =>{
					assert.equal(null, error);
					repArray.push(result);
				});
				//look up senators for the state
				var senateLookup = repCollection.find({state: record.state, chamber: "senate"}).toArray(
				(error, result) =>{
					assert.equal(null, error);
					repArray.push(result);
					res.send(repArray);
				});
			});
		});
	}
});

app.listen(8080, function(){
	console.log('listening on port 8080');
});