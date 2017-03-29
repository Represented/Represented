import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Legislator } from '../data/legislator';

@Injectable()
export class LegislatorService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private legislatorUrl = 'https://congress.api.sunlightfoundation.com/legislators?callback=JSONP_CALLBACK';

  constructor(private jsonp: Jsonp) { }

  getLegislatorById(bioguide_id: string): Promise<Legislator[]> {
    var search = new URLSearchParams()
    search.set('bioguide_id', bioguide_id);
    return this.jsonp.get(this.legislatorUrl, { search })
               .toPromise()
               .then((response) => response.json().data as Legislator[])
               .catch(this.handleError);
  }

  getLegislatorTest(bioguide_id: string) {
    var search = new URLSearchParams()
    search.set('bioguide_id', bioguide_id);
    this.jsonp.get(this.legislatorUrl, { search })
      .map(res => res.json())
      .subscribe(data => console.log(data));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
