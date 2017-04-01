// service that will handle getting representative, legislation, and vote data via the Sunlight Congress API
export class SunlightQueryService {

	//TODO decide whether to use global var or constructor Promise for Sunlight API
	private sl = require("sunlight-congress-api");
	sl.init("SOMEAPIKEY");
	constructor() {}


	//TODO make functions return arrays or objects instead of logging to console

	/* Gets all representative info using zip code.
	 * Returns unique ID, first and last name, title, party, 
	 * chamber, state, district (null for senators), office street 
	 * address, and social media and contact info.
	 */
	getRepresentativesByZip(zip) {
		var reps = sl.legislatorsLocate().filter("zip", zip).filter("in_office", "true").
				fields("bioguide_id", "chamber", "contact_form", "district", "facebook_id", 
				"first_name", "last_name", "oc_email", "office", "party", "phone", "state", 
				"title", "twitter_id", "website", "youtube_id").results;

		return reps;
	}

	/* Gets all representative info using geolocation latitude and longitude.
	 * Returns unique ID, first and last name, title, party,
	 * chamber, state, district (null for senators), office street 
	 * address, and social media and contact info.
	 */
	getRepresentativesByGeolocation(lat, longi) {
		var reps = sl.legislatorsLocate().filter("latitude", lat).filter("longitude", longi).filter("in_office", "true").
				fields("bioguide_id", "chamber", "contact_form", "district", "facebook_id", 
				"first_name", "last_name", "oc_email", "office", "party", "phone", "state", 
				"title", "twitter_id", "website", "youtube_id").results;

		return reps;
        }

	/* Gets all representatives in the Senate.
	 * Returns same info as for getting reps by zip or geolocation.
	 */
	getRepresentativesInSenate() {
		var senators = sl.legislators.filter("chamber", "senate").filter("in_office", "true").
				fields("bioguide_id", "chamber", "contact_form", "district", "facebook_id",
                                "first_name", "last_name", "oc_email", "office", "party", "phone", "state",
                                "title", "twitter_id", "website", "youtube_id").results;

		return senators;
	}

	/* Gets all representatives in the House of Representatives.
	 * Returns same info as for getting reps by zip or geolocation.
	 */
	getRepresentativesInHouse() {
		var representatives = sl.legislators.filter("chamber", "house").filter("in_office", "true").
                                fields("bioguide_id", "chamber", "contact_form", "district", "facebook_id",
                                "first_name", "last_name", "oc_email", "office", "party", "phone", "state",
                                "title", "twitter_id", "website", "youtube_id").results;

		return representatives;
	}

	/* Gets all legislation info (starting with most recently introduced) 
	 * for a representative using that representative's unique ID. Only looks 
	 * for sponsorships and cosponsorships; too many results for committee-associated 
	 * bills.
	 * Returns unique ID, object containing info on the legislation's stages, type, 
	 * chamber, number of cosponsors, enacted status, history, date introduced, time 
	 * of most recent action, time of most recent vote, official and shortened titles, 
	 * sponsor and their unique ID, and object containing links to official bill descriptions.
	 */
	getLegislationByRepresentativeID(bioguide_id) {

		// array to hold all sponsored and cosponsored bills
		var bills = [];

		var sponsorBills = sl.bills().filter("sponsor_id", bioguide_id).filter("order", "introduced_on").
				filter("history.active", "true").filter("congress", "115").
				fields("actions", "bill_id", "bill_type", "chamber", "cosponsors_count", 
				"enacted_as", "history", "introduced_on", "last_action_at", "last_vote_at", 
				"official_title", "short_title", "sponsor", "sponsor_id", "urls").results;

		var cosponsorBills = sl.bills().filter("cosponsor_ids", bioguide_id).filter("order", "introduced_on").
                                filter("history.active", "true").filter("congress", "115").
                                fields("actions", "bill_id", "bill_type", "chamber", "cosponsors_count", 
                                "enacted_as", "history", "introduced_on", "last_action_at", "last_vote_at", 
                                "official_title", "short_title", "sponsor", "sponsor_id", "urls").results;

		// adding all sponsor and cosponsor bills to bills array, then returning populated bills array
		bills.push(sponsorBills);
		bills.push(cosponsorBills);
		return bills;
	}

	/* Gets all voting info for a bill using that bill's unique ID.
	 * Returns bill's unique ID, chamber, vote number (resets every 
	 * legislative year), time of vote, vote type, question (basically 
	 * a description), required (proportion of chamber that must vote 
	 * 'Yea' for the vote to pass), result of vote, source (link to 
	 * official bill description), and an object containing a mapping 
	 * between all unique representative IDs and how the corresponding 
	 * representatives voted on this question.
	 */
	getVotesbyLegislationID(bill_id) {
		var votes = sl.votes().filter("bill_id", bill_id).filter("congress", "115").
				fields("bill_id", "chamber", "number", "voted_at", 
				"vote_type", "question", "required", "result", "source").results;

		return votes;
	}
}
