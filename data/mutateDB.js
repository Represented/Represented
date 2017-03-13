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

/*
 * Inserts a district into the districts collection
 * @param {JSON} district
 * @return {boolean} true if successful, false otherwise
 */
var insertDistrict = function(db, district, callback) {
       if (db == null ||
           district == null ||
	   callback == null ||
           !validateDistrict(district))
               return false;

	var districts = db.collection('districts');

	// Insert some documents
	districts.insertOne(district, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		//console.log("Inserted 1 district into districts");
		callback(result);
	});
	return true;
};
module.exports.insertDistrict = insertDistrict;

/*
 * Finds a district or districts that match a query
 * @return {array} matching districts
 */
var findDistrict = function(db, district, callback) {
       if (db == null ||
           district == null ||
           callback == null ||
	   // can't find an invalid district; must have a state and district field
           !validateDistrict(district))
               return false;

	var districts = db.collection('districts');

	districts.find(district).toArray(function(err, docs) {
		assert.equal(err, null);
		//console.log("Found the following records");
		//console.log(docs);
		callback(docs);
	});
	return true;
};
module.exports.findDistrict = findDistrict;


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
