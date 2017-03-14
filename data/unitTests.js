var mutateDB = require('./mutateDB');
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

exports.validateBadDistrict = function(test) {
	test.ifError(mutateDB.validateDistrict(
		{
			a: "tom",
		}
	));
	test.done();
};

exports.validateBadDistrict2 = function(test) {
	test.ifError(mutateDB.validateDistrict(
		{
			state: "WI",
			district: "0", // has to be integer
		}
	));
	test.done();
};

exports.validateBadDistrict3 = function(test) {
	test.ifError(mutateDB.validateDistrict(
		{
			state: "WI",
			district: 0,
			zipcodes: "53527", // has to be integer
		}
	));
	test.done();
};

exports.validateGoodDistrict3 = function(test) {
	test.ifError(mutateDB.validateDistrict(
		{
			state: "WI",
			district: 0,
			zipcodes: ["53527",],
		}
	));
	test.done();
};

exports.validateGoodDistrict4 = function(test) {
	test.ifError(mutateDB.validateDistrict(
		{
			state: "WI",
			district: 0,
			zipcodes: [53527, "this should fail"],
		}
	));
	test.done();
};

exports.validateGoodDistrict = function(test) {
	test.ok(mutateDB.validateDistrict(
		{
			state: "WI",
			district: 0,
		}
	));
	test.done();
};

exports.validateGoodDistrict2 = function(test) {
	test.ok(mutateDB.validateDistrict(
		{
			state: "WI",
			district: 0,
			zipcodes: [53527,], // has to be array
		}
	));
	test.done();
};

exports.insertDistrictWithNoArgs = function(test) {
	test.ifError(mutateDB.insertDistrict());
	test.done();
};

exports.insertDistrictWithMissingArgs = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

		// second param never even declared
		test.ifError(mutateDB.insertDistrict(db));
		db.close();
		db.dropDatabase();
		test.expect(1);
		test.done();
	});
};


exports.insertBadDistrict = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		test.ifError(mutateDB.insertDistrict(db,
			{
				state: "WI",
			}
		));
		db.dropDatabase();
	test.expect(1);
	test.done();
	});
};

exports.findDistrictWithMissingArgs = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

		// second and third param never even declared
		test.ifError(mutateDB.findDistrict(db));
		db.close();
		db.dropDatabase();
		test.expect(1);
		test.done();
	});
};

//exports.findBadDistrict = function(test) {
//	MongoClient.connect(url, function(err, db) {
//		assert.equal(null, err);
//		test.ifError(mutateDB.findDistrict(db,
//			{
//				state: "WI",
//			}
//		));
//		db.dropDatabase();
//		test.expect(1);
//		test.done();
//	});
//};

// _id gets tacked on the end of dist; we need to put it at the front to
// test equality because findDistrict() has _id as first field
var reorderDistrictFields = function(dist) {
	return {
			_id: dist._id,
			state: dist.state,
			district: dist.district,
			zipcode: dist.zipcode,
		};
};

exports.insertGoodDistrict = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var dist = {
				state: "WI",
				district: 1,
			   };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			// _id gets tacked on the end of dist; we need to put it at the front to
			// test equality because findDistrcit() has _id as first field
			dist = reorderDistrictFields(dist);
			test.ok(mutateDB.findDistrict(db, dist, function(docs) {
				test.ok(JSON.stringify(dist) == JSON.stringify(docs[0]), JSON.stringify(dist)+" doesn't match returned "+JSON.stringify(docs[0]));
				db.dropDatabase();
				test.expect(4);
				test.done();
			}));
		}));
	});
};

exports.insertGoodDistrict2 = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var dist = {
				state: "WI",
				district: 1,
				zipcode: [53527],
			   };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			// _id gets tacked on the end of dist; we need to put it at the front to
			// test equality because findDistrcit() has _id as first field
			dist = reorderDistrictFields(dist);
			test.ok(mutateDB.findDistrict(db, dist, function(docs) {
				test.ok(JSON.stringify(dist) == JSON.stringify(docs[0]), JSON.stringify(dist)+" doesn't match returned "+JSON.stringify(docs[0]));
				db.dropDatabase();
				test.expect(4);
				test.done();
			}));
		}));
	});
};

exports.insertGoodDistrict3 = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var dist = {
				state: "WI",
				district: 1,
				zipcode: [53527, 53706],
			   };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			// _id gets tacked on the end of dist; we need to put it at the front to
			// test equality because findDistrcit() has _id as first field
			dist = reorderDistrictFields(dist);
			test.ok(mutateDB.findDistrict(db, dist, function(docs) {
				test.ok(JSON.stringify(dist) == JSON.stringify(docs[0]), JSON.stringify(dist)+" doesn't match returned "+JSON.stringify(docs[0]));
				db.dropDatabase();
				test.expect(4);
				test.done();
			}));
		}));
	});
};

exports.insertBadDistricts = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var districts = [
					{
					state: "WI",
					district: 1,
					},
					{
					state: "WI",
					district: 2,
					},
					{
					state: "WI",
					district: 3,
					},
					// one is missing district field
					{
					state: "WI",
					},
				];
		test.ifError(mutateDB.insertDistricts(db, districts, function(result) {
		}));
		db.dropDatabase();
		test.expect(2);
		test.done();
	});
};

exports.insertGoodDistricts = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var districts = [ { state: "WI", district: 1,}, { state: "WI", district: 2,}, ];
		test.ok(mutateDB.insertDistricts(db, districts, function(result) {
			districts[0] = reorderDistrictFields(districts[0]);
			test.ok(mutateDB.findDistrict(db, districts[0], function(docs) {
				test.ok(JSON.stringify(districts[0]) === JSON.stringify(docs[0]), JSON.stringify(districts[0])+" doesn't match returned "+JSON.stringify(docs[0]));
				var dist2 = reorderDistrictFields(districts[1]);
				test.ok(mutateDB.findDistrict(db, dist2, function(docs) {
					test.ok(JSON.stringify(dist2) === JSON.stringify(docs[0]), JSON.stringify(dist2)+" doesn't match returned "+JSON.stringify(docs[0]));
					db.dropDatabase();
					test.expect(6);
					test.done();
				}));
			}));
		}));
	});
};

exports.insertGoodZipcode = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var dist = { state: "WI", district: 1, };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			dist = reorderDistrictFields(dist);
			test.ok(mutateDB.insertZipCode(db, dist, 53527, function(result) {}));
			db.dropDatabase();
			test.expect(3);
			test.done();
		}));
	});
};

exports.insertGoodZipcode2 = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var dist = { state: "WI", district: 1, };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			dist = reorderDistrictFields(dist);
			test.ok(mutateDB.insertZipCode(db, dist, 53527, function(result) {
				dist.zipcode = [53527];
					test.ok(mutateDB.findDistrict(db, dist, function(docs) {
					test.ok(JSON.stringify(dist) === JSON.stringify(docs[0]), JSON.stringify(dist)+" doesn't match returned "+JSON.stringify(docs[0]));
						db.dropDatabase();
						test.expect(5);
						test.done();
				}));
			}));
		}));
	});
};

exports.insertBadZipcodes = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var dist = { state: "WI", district: 1, };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			dist = reorderDistrictFields(dist);
			test.ifError(mutateDB.insertZipCode(db, dist, [53527, 53706], function(result) {}));
			db.dropDatabase();
			test.expect(3);
			test.done();
		}));
	});
};

exports.validateGoodRepresentative = function(test) {
	test.ok(mutateDB.validateRepresentative(
		{
			name: {first: "sally", last:"seashell"},
			location: {state: "wisconsin", district: 1},
			title: "senator",
			party: "independent"
		}
	));
	test.done();
};

// _id gets tacked on the end of dist; we need to put it at the front to
// test equality because findDistrict() has _id as first field
var reorderRepresentativeFields = function(rep) {
	return {
			_id: rep._id,
			name: rep.name,
			location: rep.location,
			title: rep.title,
			party: rep.party,
		};
};

exports.insertGoodRepresentatives = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var reps= [{
				name: {first: "sally", last:"seashell"},
				location: {state: "wisconsin", district: 1},
				title: "senator",
				party: "independent"
			},
			{
				name: {first: "john", last:"doe"},
				location: {state: "alabama", district: 69},
				title: "congressman",
				party: "libertarian"
			}];
		test.ok(mutateDB.insertRepresentatives(db, reps, function(result) {
			reps[0] = reorderRepresentativeFields(reps[0]);
			test.ok(mutateDB.findRepresentative(db, reps[0], function(docs) {
				test.ifError(docs.length == 0);
				test.ok(JSON.stringify(reps[0]) === JSON.stringify(docs[0]), JSON.stringify(reps[0])+" doesn't match returned "+JSON.stringify(docs[0]));
				var rep2 = reorderRepresentativeFields(reps[1]);
				test.ok(mutateDB.findRepresentative(db, rep2, function(docs) {
					test.ok(JSON.stringify(rep2) === JSON.stringify(docs[0]), JSON.stringify(rep2)+" doesn't match returned "+JSON.stringify(docs[0]));
					db.dropDatabase();
					test.expect(7);
					test.done();
				}));
			}));
		}));
	});
};

exports.validateGoodLegislation = function(test) {
	test.ok(mutateDB.validateLegislation(
		{
			name: "Act to Add Hot Dogs to School Lunches",
			summary: "Adds Dogs to Lunches",
			actions: [
					{
						status: "passed House",
						body: "This is the body.",
						votes: [
							{
									vote:"for"
							}
						],
					}
			],
		}
	));
	test.done();
};

// _id gets tacked on the end of dist; we need to put it at the front to
// test equality because findDistrict() has _id as first field
var reorderLegislationFields = function(leg) {
	return {
			_id: leg._id,
			name: leg.name,
			summary: leg.summary,
			categories: leg.categories,
			body: leg.body,
			sponsor: leg.sponsor,
			cosponsors: leg.cosponsors,
			actions: leg.actions
		};
};

exports.insertGoodLegislations = function(test) {
	MongoClient.connect(url, function(err, db) {
		test.ok(null == err);
		var legs = [
			{
				name: "Act to Add Hot Dogs to School Lunches",
				summary: "Adds Dogs to Lunches",
				actions: [
						{
							status: "passed House",
							body: "This is the body.",
							votes: [
								{
										vote:"for"
								}
							],
						}
				],
			},
			{
				name: "Act to Make Pizza a Vegetable",
				summary: "This allows our kiddos to get a full serving of veggies.",
				actions: [
						{
							status: "passed Senate",
							body: "This is the pizza body.",
							votes: [
								{
										vote:"against"
								}
							],
						}
				],
			}
		];
		test.ok(mutateDB.insertLegislations(db, legs, function(result) {
			legs[0] = reorderLegislationFields(legs[0]);
			test.ok(mutateDB.findLegislation(db, legs[0], function(docs) {
				test.ifError(docs.length == 0);
				test.ok(JSON.stringify(legs[0]) === JSON.stringify(legs[0]), JSON.stringify(legs[0])+" doesn't match returned "+JSON.stringify(docs[0]));
				var leg2 = reorderLegislationFields(legs[1]);
				test.ok(mutateDB.findLegislation(db, leg2, function(docs) {
					test.ok(JSON.stringify(leg2) === JSON.stringify(docs[0]), JSON.stringify(leg2)+" doesn't match returned "+JSON.stringify(docs[0]));
					db.dropDatabase();
					test.expect(7);
					test.done();
				}));
			}));
		}));
	});
};
