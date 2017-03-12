var mutateDB = require('./mutateDB');
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

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


var url = 'mongodb://localhost:27017/unit_testing_db';

exports.insertDistrictWithNoArgs = function(test) {
	test.ifError(mutateDB.insertDistrict());
	test.done();
};

var url = 'mongodb://localhost:27017/myproject';

exports.insertDistrictWithMissingArgs = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

		test.ifError(mutateDB.insertDistrict(db));
		db.close();
		db.dropDatabase();
	});
	test.done();
};

exports.insertDistrictWithMissingArgs = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);

		test.ifError(mutateDB.insertDistrict(db));
		db.close();
		db.dropDatabase();
	});
	test.done();
};

exports.insertDistrictWithMissingArgs = function(test) {
	MongoClient.connect(url, function(err, db, test) {
		assert.equal(null, err);

		test.ok(mutateDB.insertDistrict(db));
	});

	test.expect(1);
	test.done();
};

exports.insertBadDistrict = function(test) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		test.ok(mutateDB.insertDistrict(db,
			{
				state: "WI",
			}
		));
		db.dropDatabase();
	});

	test.expect(1);
	test.done();
};

//exports.insertDistrict = function(test) {
//	MongoClient.connect(url, function(err, db) {
//		assert.equal(null, err);
//		test.ok(mutateDB.insertDistrict(db,
//			{
//				state: "WI",
//				district: 1,
//				zipcodes: [53527,],
//			}
//		));
//		db.close();
//		db.dropDatabase();
//	});
//	test.done();
//};
