import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { Legislator }               from './legislator';
import { LegislatorService }        from './legislator.service';
import { DataScrollerModule }       from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'my-legislator',
  templateUrl: '../views/legislator.component.html',
  styleUrls: [ '../styles/legislator.component.css' ]
})
export class LegislatorComponent implements OnInit {
<<<<<<< HEAD
  legislator: Legislator;
=======
  legislator: Legislator[];
  selectedLegislator: Legislator;
>>>>>>> d150614ee3c4cf30f1bb480ea261f6e660477387

  constructor(
    private legislatorService: LegislatorService,
    private router: Router) { }

  getLegislator(): void {
    this.legislatorService
        //.getAllLegislators()
        .getLegislatorById("R000570")
        .subscribe(legislator => this.legislator = legislator);
        //console.log(this.legislator);
  }

  onSelect(legislator: Legislator) {
    this.selectedLegislator = legislator;
  }

  ngOnInit(): void {
    this.getLegislator();
  }

  gotoProfile(): void {
    this.router.navigate(['/profile', this.selectedLegislator.bioguide_id]);
  }
}
