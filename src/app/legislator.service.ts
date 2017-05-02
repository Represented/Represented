import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { Legislator } from './legislator';
import { Bill } from './bill';
import { Vote } from './vote';

@Injectable()
export class LegislatorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'https://congress.api.sunlightfoundation.com';
  // private photoUrl = 'https://theunitedstates.io/images/congress/orignal/';

  constructor(private jsonp: Jsonp) { }

  getAllHouseLegislators(page: string): Observable<Legislator[]> {
    let search = new URLSearchParams()
    search.set('chamber', 'house');
    search.set('order', 'last_name__asc');
    search.set('page', page);
    let res = this.jsonp.get(`${this.baseUrl}/legislators?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Legislator[]);
    return res;
  }

  getAllSenateLegislators(page: string): Observable<Legislator[]> {
    let search = new URLSearchParams()
    search.set('chamber', 'senate');
    search.set('order', 'last_name__asc');
    search.set('page', page);
    let res = this.jsonp.get(`${this.baseUrl}/legislators?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Legislator[]);
    return res;
  }

  getLegislatorById(bioguide_id: string): Observable<Legislator> {
    let search = new URLSearchParams()
    search.set('bioguide_id', bioguide_id);
    let res = this.jsonp.get(`${this.baseUrl}/legislators?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Legislator);
    return res;
  }

  getLegislatorByZip(zip: string): Observable<Legislator[]> {
    var search = new URLSearchParams();
		search.set('zip', zip);
		let res = this.jsonp.get(`${this.baseUrl}/legislators/locate?callback=JSONP_CALLBACK`, { search })
                .map(response => response.json().results as Legislator[]);
    return res;
  }

  getLegislatorByLocation(longitude: string, latitude: string): Observable<Legislator[]> {
    var search = new URLSearchParams();
    search.set('latitude', latitude);
		search.set('longitude', longitude);
		let res = this.jsonp.get(`${this.baseUrl}/legislators/locate?callback=JSONP_CALLBACK`, { search })
                .map(response => response.json().results as Legislator[]);
    return res;
  }

  getLegLatestSponsorAction(bioguide_id: string): Observable<Bill[]> {
    let search = new URLSearchParams()
    search.set('sponsor_id', bioguide_id);
    search.set('order', 'introduced_on');
    let res = this.jsonp.get(`${this.baseUrl}/bills?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Bill[]);
    return res;
  }

  getLegLatestCosponsorAction(bioguide_id: string): Observable<Bill[]> {
    let search = new URLSearchParams();
    search.set('cosponsor_ids', bioguide_id);
    search.set('order', 'introduced_on');
    let res = this.jsonp.get(`${this.baseUrl}/bills?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Bill[]);
    return res;
  }

  getLegLatestVoteAction(bioguide_id: string, page: string): Observable<Vote[]> {
    let search = new URLSearchParams();
    search.set('voter_ids.' + bioguide_id + '__exists', 'true');
    search.set('bill_id__exists', 'true');
    search.set('fields','roll_id,bill,voted_at,vote_type,required,result,question,voters.'+bioguide_id+'.vote');
    search.set('page', page);
    search.set('order', 'voted_at');
    console.log(search);
    let res = this.jsonp.get(`${this.baseUrl}/votes?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Vote[]);
    return res;
  }
}

function mapLegislators(response:Response): Legislator{
   // The response of the API has a results
   // property with the actual results
   console.log(response.json() as Legislator);
   return response.json().results as Legislator;
}

function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
