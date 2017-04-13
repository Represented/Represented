import 'zone.js';
import 'reflect-metadata';

import { Component }          from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-about',
  templateUrl: '../views/about.component.html',
  styleUrls: ['../styles/about.component.css']
})
export class AboutComponent {
}
