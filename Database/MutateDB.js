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

var validateRepresentative = function(district) {
	var nameSchema = {
		"id": "/Name",
		"type": "object",
		"properties": {
			"first": {"type": "string"},
			"last": {"type": "string"}
		},
		"required": ["first", "last"]
	};
	v.addSchema(nameSchema, '/Name');

	var locationSchema = {
		"id": "/Location",
		"type": "object",
		"properties": {
			"state": {"type": "string"},
			"district": {"type": "integer"}
		},
		"required": ["state", "district"]
	};
	v.addSchema(locationSchema, '/Location');

	return v.validate(district, {
		"id": "/Representative",
		"type": "object",
		"properties": {
			"name": {"$ref": "/Name"},
			"location": {"$ref": "/Location"},
			"title": {"type": "string"},
			"party": {"type": "string"},
			"biography": {"type": "string"},
			"portraitURL": {"type": "string"},
			"email": {"type": "string"},
			"phoneNumber": {"type": "string"}
		},
		"required": ["name", "location", "title", "party"]
	}).valid;
};
module.exports.validateRepresentative = validateRepresentative;

var validateLegislation = function(legislation) {
	// TODO fix voteSchema so that it actually works
//	var voteSchema = {
//		"id": "/Vote",
//		"type": "object",
//		"properties": {
////			"enum": ["for", "against", "absent"]
////			"representative": {"type": "object"},
//			"enum": [
//				{"vote":"for"},
//				{"vote":"against"},
//				{"vote":"absent"},
//			],
//		},
//
////		"required": ["representative", "enum"]
////		"required": ["for"]
//	};
//	v.addSchema(voteSchema, "/Vote");

	var actionSchema = {
		"id": "/Action",
		"type": "object",
		"properties": {
			"status": {"type": "string"},
			"date": {"type": "string"},
			"body": {"type": "string"},
			"representatives": {
							"type": "array",
							"items": "object"
			},
			"votes": {
							"type": "array",
							"items": {
								"representative": {"type": "object"},
								//"$ref": "/Vote",
								"vote": {"type": "string"}
							}
			}
		},
		"required": ["status", "body"]
	};
	v.addSchema(actionSchema, '/Action');

	return v.validate(legislation, {
		"id": "/Legislation",
		"type": "object",
		"properties": {
			"name": {"type": "string"},
			"summary": {"type": "string"},
			"categories": {"type": "string"},
			"body": {"type": "string"},
			"sponsor": {"type": "object"},
			"cosponsors": {
				"type": "array",
				"items": {"type": "object"}
			},
			"actions": {
							"type": "array",
							"items": {"$ref": "/Action"},
			},
		},
		"required": ["name", "summary"]
	}).valid;
};
module.exports.validateLegislation = validateLegislation;

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
 * Inserts districts into the districts collection
 * @param {JSON} district
 * @return {boolean} true if successful, false otherwise
 */
var insertDistricts = function(db, dists, callback) {
       if (db == null ||
           dists == null ||
	   callback == null)
               return false;

	for (var i = 0; i < dists.length; i++)
		if (!validateDistrict(dists[i]))
			return false;

	var districts = db.collection('districts');

	// Insert some documents
	districts.insertMany(dists, function(err, result) {
		var numDistricts = dists.length;
		assert.equal(err, null);
		assert.equal(numDistricts, result.result.n);
		assert.equal(numDistricts, result.ops.length);
//		console.log("Inserted "+numDistricts+" documents into the collection");
		callback(result);
	});
	return true;
};
module.exports.insertDistricts = insertDistricts;

/*
 * Adds a zipcode to a district
 * @param {JSON} district (needs state and district fields)
 * @param {integer} zipcode
 * @return {boolean} true if successful, false otherwise
 */
var insertZipCode = function(db, district, zipcode, callback) {
	if (db == null ||
			district == null ||
			zipcode == null ||
			typeof zipcode !== 'number' ||
			callback == null ||
		  !validateDistrict(district)) {
				return false;
			}


	var districts = db.collection('districts');

	// Insert some documents
	districts.updateOne(district, { $addToSet: {zipcode: zipcode} }, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		//console.log("Updated the document "+JSON.stringify(district));
		callback(result);
	});
	return true;
};
module.exports.insertZipCode = insertZipCode;

/*
 * Finds a district or districts that match a query
 * @return {array} matching districts
 */
var findDistrict = function(db, district, callback) {
	//console.log("Entered findDistrict()");
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

/*
 * Finds a representative or representatives that match a query
 * @return {array} matching representatives
 */
var findRepresentative = function(db, representative, callback) {
	//console.log("Entered findDistrict()");
       if (db == null ||
           representative == null ||
           callback == null ||
	   // can't find an invalid district; must have a state and district field
           !validateRepresentative(representative))
               return false;

	var representatives = db.collection('representatives');

	representatives.find(representative).toArray(function(err, docs) {
		assert.equal(err, null);
//		console.log("Found the following records");
//		console.log(docs);
//		console.log("typeof _id "+typeof docs[0]._id);
		callback(docs);
	});
	return true;
};
module.exports.findRepresentative = findRepresentative;

/*
 * Finds legislation(s) that match a query
 * @return {array} matching legislation(s)
 */
var findLegislation = function(db, leg, callback) {
	//console.log("Entered findDistrict()");
       if (db == null ||
           leg == null ||
           callback == null ||
	   // can't find an invalid district; must have a state and district field
           !validateLegislation(leg))
               return false;

	db.collection('legislation').find(leg).toArray(function(err, docs) {
		assert.equal(err, null);
//		console.log("Found the following records");
//		console.log(docs);
//		console.log("typeof _id "+typeof docs[0]._id);
		callback(docs);
	});
	return true;
};
module.exports.findLegislation = findLegislation;

/*
 * Inserts one or more representatives into the districts collection
 * @param {JSON array} representatives
 * @return {boolean} true if successful, false otherwise
 */
var insertRepresentatives = function(db, reps, callback) {
	if (db == null ||
			reps == null ||
			callback == null)
				return false;

	for (var i = 0; i < reps.length; i++)
		if (!validateRepresentative(reps[i]))
			return false;

	var representatives = db.collection('representatives');

	// Insert some documents
	representatives.insertMany(reps, function(err, result) {
		var numReps = reps.length;
		assert.equal(err, null);
		assert.equal(numReps, result.result.n);
		assert.equal(numReps, result.ops.length);
//		console.log("Inserted "+numReps+" representatives into the collection");
		callback(result);
	});
	return true;
};
module.exports.insertRepresentatives = insertRepresentatives;

/*
 * Inserts one or more pieces of legislation into the legislation collection
 * @param {JSON array} legislation
 * @return {boolean} true if successful, false otherwise
 */
var insertLegislations = function(db, legs, callback) {
	if (db == null ||
			legs == null ||
			callback == null)
				return false;

	for (var i = 0; i < legs.length; i++)
		if (!validateLegislation(legs[i]))
			return false;

	// Insert some documents
	db.collection('legislation').insertMany(legs, function(err, result) {
		var count = legs.length;
		assert.equal(err, null);
		assert.equal(count, result.result.n);
		assert.equal(count, result.ops.length);
//		console.log("Inserted "+count+" into legislation collection");
		callback(result);
	});
	return true;
};
module.exports.insertLegislations = insertLegislations;

// TODO
// add representative(s)
// add sponsor to legislation (ObjectID)
// add cosponsors to legislation (ObjectID)
// add representatives to action (ObjectID)
// add legislation
