var assert = require('assert'),
    Validator = require('jsonschema').Validator,
    v = new Validator();

var validateDistrict = function(district) {
       return v.validate(district,
               {
                       "id": "/District",
                       "type": "object",
                       "properties": {
                               "state": {"type": "string"},
                               "district": {"type": "integer"},
                               "zipcodes": {
                                       "type": "array",
                                       "items": {"type": "integer"}
                               }
                       },
                       "required": ["state", "district"]
               }
       ).valid;
};
module.exports.validateDistrict = validateDistrict;

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
