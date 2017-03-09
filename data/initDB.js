// taken from http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/

// assumes that mongo daemon is running on server on port 27017

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	db.close();
});

//// Create collections with document validation
//// http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collections/
//// TODO check actionsID for type even though docs don't need any actions
//var createRepresentatives = function(db, callback) {
//  db.createCollection("representatives",
//	    {
//	      'validator': { '$and':
//	         [
//		    { 'name': { '$type': "string" } },
//		    { 'title': { '$type': "string" } }, // can be array
//		    { 'party': { '$type': "string" } },
//		    { 'biography': { '$type': "string" } },
//		    { 'portraitURL': { '$type': "string" } },
//		    { 'email': { '$type': "string" } },
//		    { 'phoneNumber': { '$type': "string" } },
//		    { 'location.state': { '$type': "string" } },
//		    { 'location.district': { '$type': "string" } },
//	         ]
//	      }
//	   },
//    function(err, results) {
//      console.log("Collection representatives created.");
//      callback();
//    }
//  );
//};
