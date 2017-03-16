import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RepAction } from './repaction';

@Injectable()
export class RepActionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private actionsUrl = 'api/actions';  // URL to web api

  constructor(private http: Http) { }

  getActions(): Promise<RepAction[]> {
    return this.http.get(this.actionsUrl)
               .toPromise()
               .then(response => response.json().data as RepAction[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
