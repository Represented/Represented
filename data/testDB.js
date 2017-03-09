var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , mutateDB = require('./mutateDB.js');


var url = 'mongodb://localhost:27017/testdb';

//----- TEST CASE: ADD ONE DOCUMENT TO DATABASE -----//
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected successfully to server");

	var rep = {
		a : "tom",
	};

	var collection = 'representatives';

	mutateDB.insertDocument(db, 'representatives', rep, function() {
		db.close();
	});
	mutateDB.removeDB(db);
});
