// Proof-Of-Concept about how to use Sunlight API instead of parser/db

// HOW THIS IS GOING TO BE USED
	// all of this will be stored into object arrays used to populate timelines/other views
	// these are the big messy objects that have more fields that we are going to use for the views

	// Need a different service for each query
	// Each service represents a call to the Sunlight API
	// These are stored in src/app/

var sl = require("sunlight-congress-api");

var success = function(data){
	console.log(data);
}
sl.init("SOMEAPIKEY");



// FEED PAGE =================================================================
	// (getLegislationByLegislationID)...
	// When feed page loads, need to make a query to get reps by location
	// Then need content to display on feed: get legislation by reps
	// 	just make sure that we are only getting legislation that
	// 	corresponds to those three representatives; skip all other legislation

// get representatives by location
// zip (e.g. Cottage Grove, WI)
var zip = "53527";
sl.legislatorsLocate().filter("zip", zip).fields("bioguide_id", "title", "first_name", "last_name", "name_suffix", "party").call(success);
// lat+long (e.g. Madison, WI)
var lat = "43.073052";
var longi = "-89.401230";
sl.legislatorsLocate().filter("latitude", lat).filter("longitude", longi).fields("bioguide_id", "title", "first_name", "last_name", "name_suffix", "party").call(success);

// get legislation for each representative
// must get if rep is sponsor, cosponsor, or in committee because that means that they would have a say in the bill
var bioguide_id = "B001230";
// filter by sponsorship
sl.bills().filter("sponsor_id", bioguide_id).filter("order","introduced_on").filter("history.active", "true").fields("bill_id", "bill_type", "number", "official_title", "popular_title", "short_title", "nicknames").filter("order", "last_action_at").filter("congress", "115").call(success);
// filter by cosponsorship
sl.bills().filter("cosponsor_ids", bioguide_id).filter("order","introduced_on").filter("history.active", "true").fields("bill_id", "bill_type", "number", "official_title", "popular_title", "short_title", "nicknames").filter("order", "last_action_at").filter("congress", "115").call(success);

// LEGISLATION PAGE ==========================================================
	// TODO getLegislationDataByBillID()


// REPRESENTATIVE PAGE =======================================================
	// TODO getInformationAboutRepresentative()
	// TODO getLegislationByRepresentative() // actions of representative
	// TODO getVotesByRepresentative()
