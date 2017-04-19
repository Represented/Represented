import { Injectable }    from '@angular/core';
import { Headers, Http, Jsonp, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Bill }         from './bill';
import { DetailedBill } from './detailed-bill';
import { Vote }         from './vote';
import { Legislator }   from './legislator';

@Injectable()
export class VoteService {
    private baseUrl = 'https://congress.api.sunlightfoundation.com';
    private vote_fields = `bill_id,bill,question,required,result,roll_id,nomination,vote_type,voted_at,voters,breakdown,breakdown.total,
    breakdown.total.Yea,breakdown.total.Nay,breakdown.total.Not_Voting,breakdown.total.Present`;
    constructor(private jsonp: Jsonp) { }

    getsVotesByBillID(bill_id: string): Observable<Vote> {
        let search = new URLSearchParams();
        search.set('bill_id', bill_id);
        search.set('fields', this.vote_fields);
        console.log(this.vote_fields);
        let res = this.jsonp.get(`${this.baseUrl}/votes?callback=JSONP_CALLBACK`, {search})
                .map(response => response.json().results as Vote);
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