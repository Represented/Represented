import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Legislator }               from './legislator';
import { LegislatorService }        from './legislator.service';
import { Location }                 from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'legislator-profile',
    templateUrl: '../views/legislator-profile.component.html',
    styleUrls: ['../styles/legislator-profile.component.css']
})
export class LegislatorProfileComponent implements OnInit {
    rep: Legislator;
    constructor(
        private legislatorService: LegislatorService, 
        private route: ActivatedRoute,
        private location: Location,
        private service: LegislatorService
    ) { this.rep = new Legislator(); }

    ngOnInit(): void {
        let id = this.route.snapshot.params['bioguide_id'];
        this.route.params
        .switchMap((params: Params) => this.service.getLegislatorById(id))
        .subscribe((leg: Legislator) => this.rep = leg);
        console.log(id);
        console.log(this.rep.first_name);
    }

    goBack(): void {
        this.location.back();
    }
}
