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

// Create collections with document validation
// http://mongodb.github.io/node-mongodb-native/2.2/tutorials/collections/
var createValidated = function(db, callback) {
  db.createCollection("contacts",
	   {
	      'validator': { '$or':
	         [
	            { 'phone': { '$type': "string" } },
	            { 'email': { '$regex': /@mongodb\.com$/ } },
	            { 'status': { '$in': [ "Unknown", "Incomplete" ] } }
	         ]
	      }
	   },
    function(err, results) {
      console.log("Collection created.");
      callback();
    }
  );
};
