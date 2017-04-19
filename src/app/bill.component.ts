import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Bill }                     from './bill';
import { BillService }              from './bill.service';
import { DetailedBill }             from './detailed-bill';
import { DataScrollerModule }       from 'primeng/primeng';
import { Location }                 from '@angular/common';
import { Vote }                     from './vote';
import { VoteService }              from './vote.service';
import { ChartModule } from 'primeng/primeng';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'my-bill',
  templateUrl: '../views/bill.component.html',
  styleUrls: [ '../styles/bill.component.css' ]
})
export class BillComponent implements OnInit {
  bill: DetailedBill;
  vote: Vote;
  data: any;
  Yea: number;
  Nay: number;
  Not_Voting: number;
  Present: number;

  constructor(
    private billService: BillService,
    private voteService: VoteService,
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

  getVote(): void {
    this.route.params
      .switchMap((params: Params) =>
        this.voteService
        .getsVotesByBillID(params['bill_id']))
        .subscribe(vote => (this.vote = vote,
        this.Yea = vote.breakdown.total.Yea,
        this.Nay = vote.breakdown.total.Nay,
        this.Not_Voting = vote.breakdown.total.Not_Voting,
        this.Present = vote.breakdown.total.Not_Voting));

        this.setData(this.Yea, this.Nay, this.Not_Voting, this.Present);
  }

  setData(Yea: number, Nay: number, Not_Voting: number, Present: number ): void {
    this.data = {
      labels: ['Yea', 'Nay', 'Not Voting', 'Present'],
      datasets: [
        {
          data: [Yea, Nay, Not_Voting, Present],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }
      ]
    };
  }
  ngOnInit(): void {
    this.getBill();
    this.getVote();
  }

  goToLegislator(bioguide_id: string): void {
    this.router.navigate(['/legislator', bioguide_id]);

  }

  goBack(): void {
    this.location.back();
  }
}
