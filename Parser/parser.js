// flag to track whether the data currently being posted to the database is representative data or legislation data
var isRepData = true;

// requires for connecting to the database
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

function getData() {

	/* calling Sunlight API to get JSON data */

	// using different values for arg to get all necessary data
	for (i = 0; i < 2; i++) {

		// setting up path for next HTTP request; start of path will 
		// always be the same, but various arguments will be appended 
		// to the end as needed
		var path = "https://congress.api.sunlightfoundation.com/";
		var arg; 
		switch (i) {
			case 0: 
				arg = "legislators?per_page=all";
				isRepData = true;
				break;
			case 1:
				arg = "bills?history.active=true&order=last_action_at";
				isRepData = false;
				break;
			default:
				console.log("Unexpected parser behavior encountered; stopping execution.");
				return null;
		}
		path = path.concat(arg);
		//TODO remove
		console.log("Current path is " + path);

		// instantiating HTTP request
       		var xhReq = new XMLHttpRequest();

		// listener and handler for HTTP request
		xhReq.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				// parsing received JSON data into an actual JS object
				//TODO remove
				console.log(this.responseText);
		       		var inputData = JSON.parse(this.responseText);
				//TODO remove
				console.log(inputData.results);
				postData(inputData.results);
			}
		};

		// sending HTTP request
	        xhReq.open("GET", path, false);
		xhReq.send();
	}
}

function parseData(inputData) {
	//TODO remove
	console.log("Calling parseData()");
	//TODO maybe change by parsing only some of input into output
	var outputData = inputData;
	postData(outputData);
	return outputData;
}

function postData(outputData) {
	//TODO remove
	console.log("Calling postData()");

	// database url
	var url = 'mongodb://localhost:27017/myproject';

	// deciding whether this is representative or legislation data
	if (isRepData) {

		//TODO remove
		console.log("Inserting representative data");

		// connecting to database
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");

			//TODO remove
			console.log("Attempting to insert representative data into db");

			// Insert some documents
			db.collection('representatives').insertMany(outputData, function(err, result) {
				var count = legs.length;
				assert.equal(err, null);
				assert.equal(count, result.result.n);
				assert.equal(count, result.ops.length);
				callback(result);
			});
		});
	} else {

		//TODO remove
		console.log("Inserting legislation data");

		// connecting to database
		MongoClient.connect(url, function(err, db) {
			assert.equal(err, null);
			console.log("Connected correctly to server");

			//TODO remove
			console.log("Attempting to insert legislation data into db");

			db.collection('legislation').insertMany(outputData, function(err, result) {
				var count = legs.length;
				assert.equal(err, null);
				assert.equal(count, result.result.n);
				assert.equal(count, result.ops.length);
				callback(result);
			});
		});
	}
}

// initiating the process of getting data for the database
getData();
