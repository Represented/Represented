var assert = require('assert');
//module.exports = {
//	insert: function () {
//	}
//}

//var insertDocuments = function(db, callback) {
//	// Get the documents collection
//	var collection = db.collection('documents');
//	// Insert some documents
//	collection.insertMany([
//		{a : 1}, {a : 2}, {a : 3}
//	], function(err, result) {
//		assert.equal(err, null);
//		assert.equal(3, result.result.n);
//		assert.equal(3, result.ops.length);
//		console.log("Inserted 3 documents into the collection");
//		callback(result);
//	});
//}
// module.exports.insertDocuments = insertDocuments;
var insertDocument = function(db, collection, doc, callback) {
	// Get the documents collection
	var coll = db.collection(collection);
	// Insert some documents
	coll.insertOne(doc, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log("Inserted 1 document into the collection");
		callback(result);
	});
}
module.exports.insertDocument = insertDocument;

// http://mongodb.github.io/node-mongodb-native/2.2/api/Db.html#dropDatabase
var removeDB = function(db, callback) {
	db.dropDatabase(function(err, result) {
		assert.equal(null, err);

		// Wait two seconds to let it replicate across
		setTimeout(function() {
			// Get the admin database
			db.admin().listDatabases(function(err, dbs) {
				// Grab the databases
				dbs = dbs.databases;
				// Did we find the db
				var found = false;
				
				// Check if we have the db in the list
				for(var i = 0; i < dbs.length; i++) {
					if(dbs[i].name == 'integration_tests_to_drop') found = true;
				}
				
				// We should not find the databases
				if(process.env['JENKINS'] == null) test.equal(false, found);
				
				db.close();
			});
			console.log("Dropped the database");
		}, 2000);
	});
}
module.exports.removeDB = removeDB;
