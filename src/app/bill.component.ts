import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Bill }                     from './bill';
import { BillService }              from './bill.service';
import { DataScrollerModule }       from 'primeng/primeng';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'my-bill',
  templateUrl: '../views/bill.component.html',
  styleUrls: [ '../styles/bill.component.css' ]
})
export class BillComponent implements OnInit {
  bill: Bill;

  constructor(
    private billService: BillService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  getBill(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.billService
        .getBillById(params['bill_id']))
        .subscribe(bill => this.bill = bill);
  }

  ngOnInit(): void {
    this.getBill();
  }

  goBack(): void {
    this.location.back();
  }
}