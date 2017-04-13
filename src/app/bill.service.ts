import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Bill }         from './bill';
import { DetailedBill } from './detailed-bill';

@Injectable()
export class BillService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'https://congress.api.sunlightfoundation.com';
  private fields  = `bill_id,bill_type,chamber,committee_ids,congress,cosponsors,cosponsors_count,enacted_as,history,introduced_on,last_action_at,
last_version,last_version_on,last_vote_at,number,official_title,popular_title,related_bill_ids,short_title,sponsor,sponsor_id,urls,withdrawn_cosponsors_count`;

  constructor(private jsonp: Jsonp) { }

  getBillById(bill_id: string): Observable<DetailedBill> {
    var search = new URLSearchParams();
    search.set('bill_id', bill_id);
    search.set('fields',this.fields);
    console.log(this.fields);
    let res = this.jsonp.get(`${this.baseUrl}/bills?callback=JSONP_CALLBACK&bill_id`, {search})
               .map(response => response.json().results as DetailedBill);
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
