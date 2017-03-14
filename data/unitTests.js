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

