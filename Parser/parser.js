// enum and flag to track whether the data currently being posted to the database is representative data or legislation data
var dataEnum = {
	REP : 0,
	LEGISLATION : 1,
	VOTES : 2
}
var dataFlag = dataEnum.REP;

// requires for making requests to the Sunlight API and connecting to the database
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

function getData() {

	/* calling Sunlight API to get JSON data */

	// using different values for arg to get all necessary data
	for (var i = 0; i < 3; i++) {

		// setting up path for next HTTP request; start of path will 
		// always be the same, but various arguments will be appended 
		// to the end as needed
		var path = "https://congress.api.sunlightfoundation.com/";
		var arg; 
		switch (i) {
			case 0: 
				arg = "legislators?per_page=all";
				dataFlag = dataEnum.REP;
				break;
			case 1:
				arg = "bills?history.active=true&order=last_action_at";
				dataFlag = dataEnum.LEGISLATION;
				break;
			case 2:
				arg = "votes?fields=bill_id,results,voter_ids";
				dataFlag = dataEnum.VOTES;
				break;
			default:
				console.log("Unexpected parser behavior encountered; stopping execution.");
				return null;
		}
		path = path.concat(arg);
		console.log("Current path is " + path);

		// instantiating HTTP request
       		var xhReq = new XMLHttpRequest();

		// listener and handler for HTTP request
		xhReq.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				// parsing received JSON data into an actual JS object
				//console.log(this.responseText);
		       		var inputData = JSON.parse(this.responseText);
				//console.log(inputData.results);
				postData(inputData.results);
			}
		};

		// sending HTTP request
	        xhReq.open("GET", path, false);
		xhReq.send();
	}
}

/* Commands to be run in Mongo shell:
 * db.representatives.createIndex({"bioguide_id": 1}, {unique: true})
 * db.legislation.createIndex({"bill_id": 1}, {unique: true})
 * db.votes.createIndex({"bill_id": 1}, {unique: true})
 */
function postData(outputData) {
	console.log("Calling postData()");

	// database url
	var url = 'mongodb://localhost:27017/representedDB';
	// url for manual testing database
	//var url = 'mongodb://localhost:27017/myproject';

	// deciding whether this is representative or legislation data
	if (dataFlag == dataEnum.REP) {
		console.log("Inserting representative data");

		// connecting to database
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			console.log("Attempting to insert representative data into db");

			// eventually, this will be removed and the commented out for loop 
			// that does upserts (update-inserts) will be used instead for robustness
			db.collection('representatives').drop();

			// Insert some documents
			db.collection('representatives').insertMany(outputData, function(err, result) {
				var count = outputData.length;
				assert.equal(err, null);
				assert.equal(count, result.result.n);
				assert.equal(count, result.ops.length);
				db.close();
			});

			// loop over all representatives, using unique index to update or insert as required
			/*for (var k = 0; k < outputData.length; k++) {
				db.collection('representatives').updateOne({bioguide_id: outputData[k].bioguide_id}, 
						outputData[k], {upsert: true}, function(err, result) {
					//var count = outputData.length;
					assert.equal(err, null);
					//assert.equal(count, result.result.n);
					//assert.equal(count, result.ops.length);
					db.close();
				});
			}*/
		});
	} else if (dataFlag == dataEnum.LEGISLATION) {
		console.log("Inserting legislation data");

		// connecting to database
		MongoClient.connect(url, function(err, db) {
			assert.equal(err, null);
			console.log("Connected correctly to server");
			console.log("Attempting to insert legislation data into db");

                        // eventually, this will be removed and the commented out for loop 
                        // that does upserts (update-inserts) will be used instead for robustness
			db.collection('legislation').drop();

			db.collection('legislation').insertMany(outputData, function(err, result) {
				var count = outputData.length;
				assert.equal(err, null);
				assert.equal(count, result.result.n);
				assert.equal(count, result.ops.length);
				db.close();
			});

			// loop over all legislation, using unique index to update or insert as required
                        /*for (var k = 0; k < outputData.length; k++) {
                                db.collection('legislation').updateOne({bill_id: outputData[k].bill_id}, 
                                                outputData[k], {upsert: true}, function(err, result) {
                                        //var count = outputData.length;
                                        assert.equal(err, null);
                                        //assert.equal(count, result.result.n);
                                        //assert.equal(count, result.ops.length);
                                        db.close();
                                });     
                        }*/
		});
	} else if (dataFlag == dataEnum.VOTES) {
                console.log("Inserting votes data");

		// looping over each vote and getting rid of voter field
		for (var j = 0; j < outputData.length; j++) {
			delete outputData[j].voter;
		}

                // connecting to database
                MongoClient.connect(url, function(err, db) {
                        assert.equal(err, null);
                        console.log("Connected correctly to server");
                        console.log("Attempting to insert votes data into db");

                        // eventually, this will be removed and the commented out for loop 
                        // that does upserts (update-inserts) will be used instead for robustness
			db.collection('votes').drop();

                        db.collection('votes').insertMany(outputData, function(err, result) {
                                var count = outputData.length;
                                assert.equal(err, null);
                                assert.equal(count, result.result.n);
                                assert.equal(count, result.ops.length);
				db.close();
                        });

			// loop over all legislation, using unique index to update or insert as required
                        /*for (var k = 0; k < outputData.length; k++) {
                                db.collection('legislation').updateOne({bill_id: outputData[k].bill_id}, 
                                                outputData[k], {upsert: true}, function(err, result) {
                                        //var count = outputData.length;
                                        assert.equal(err, null);
                                        //assert.equal(count, result.result.n);
                                        //assert.equal(count, result.ops.length);
                                        db.close();
                                });     
                        }*/
                });
	} else {
		console.log("Error; processing unknown data type");
	}
}

// initiating the process of getting data for the database
getData();
