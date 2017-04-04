import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


import { Legislator } from './legislator';
import { Bill } from './bill';

@Injectable()
export class LegislatorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'https://congress.api.sunlightfoundation.com';

  constructor(private jsonp: Jsonp) { }

  getAllLegislators(): Observable<Legislator[]> {
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    let res = this.jsonp.get(`${this.baseUrl}/legislators?callback=JSONP_CALLBACK`, { headers:this.headers })
               .map(response => response.json().results as Legislator[]);
    return res;
  }

  getLegislatorById(bioguide_id: string): Observable<Legislator> {
    var search = new URLSearchParams()
    search.set('bioguide_id', bioguide_id);
    let res = this.jsonp.get(`${this.baseUrl}/legislators?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Legislator);
    return res;
  }

  getLegLatestSponsorAction(bioguide_id: string): Observable<Bill[]> {
    var search = new URLSearchParams()
    search.set('sponsor_id', bioguide_id);
    search.set('order', 'last_action_at');
    let res = this.jsonp.get(`${this.baseUrl}/bills?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Bill[]);
    return res;
  }

  getLegLatestCosponsorAction(bioguide_id: string): Observable<Bill[]> {
    var search = new URLSearchParams()
    search.set('cosponsor_ids', bioguide_id);
    search.set('order', 'last_action_at');
    console.log(`${this.baseUrl}/bills?callback=JSONP_CALLBACK`, { search });
    let res = this.jsonp.get(`${this.baseUrl}/legislators?callback=JSONP_CALLBACK`, { search })
               .map(response => response.json().results as Bill[]);
    return res;
  }

  /*getLegislatorTest(bioguide_id: string) {
    var search = new URLSearchParams()
    search.set('bioguide_id', bioguide_id);
    this.jsonp.get(this.legislatorUrl, { search })
      .map(res => res.json())
      .subscribe(data => console.log(data));
  }*/

  /*private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Observable.throw(error.message || error);
  }
  private handleError (error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Yikes! There was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
  }*/
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
