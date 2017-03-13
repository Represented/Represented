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

exports.insertGoodDistrict = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		test.ok(mutateDB.insertDistrict(db,
			{
				state: "WI",
				district: 1,
			}, function(result) {
			db.dropDatabase();
			test.ok(true);
			test.expect(2);
			test.done();
		}));
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

exports.findGoodDistrict = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		var dist = {
				state: "WI",
				district: 1,
			   };
		test.ok(mutateDB.insertDistrict(db, dist, function(result) {
			// _id gets tacked on the end of dist; we need to put it at the front to
			// test equality because findDistrcit() has _id as first field
			dist = {
					_id: dist._id,
					state: dist.state,
					district: dist.district,
				};
			test.ok(mutateDB.findDistrict(db, dist, function(docs) {
				test.ok(JSON.stringify(dist) == JSON.stringify(docs[0]), JSON.stringify(dist)+" doesn't match returned"+JSON.stringify(docs[0]));
				db.dropDatabase();
				test.expect(3);
				test.done();
			}));
		}));
	});
};
