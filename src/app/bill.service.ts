import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Bill } from './bill';

@Injectable()
export class BillService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'https://congress.api.sunlightfoundation.com';

  constructor(private jsonp: Jsonp) { }

  getBillById(bill_id: string): Observable<Bill> {
    var search = new URLSearchParams();
    search.set('bill_id', bill_id);
    let res = this.jsonp.get(`${this.baseUrl}/bills?callback=JSONP_CALLBACK&bill_id`, {search})
               .map(response => response.json().results as Bill);
    return res;
  }
}

function handleError (error: any) {
  // log error
  // could be something more sofisticated
  let errorMsg = error.message || `Yikes! There was was a problem and we couldn't retrieve your data!`
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}
