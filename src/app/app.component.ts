import { Component }          from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>
      <img src="../img/represented_logo_3.png" height="50" width="40" routerLink="/newsfeed" routerLinkActive="active">{{title}}
      <img src="../img/Info.png" height="40" width="40" align="right" routerLink="/about" routerLinkActive="active">
    </h1>
    <nav>
      <a routerLink="/newsfeed" routerLinkActive="active">My Reps</a>
      <a routerLink="/newsfeed" routerLinkActive="inactive">House</a>
      <a routerLink="/newsfeed" routerLinkActive="inactive">Senate</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/welcome" routerLinkActive="active">Welcome</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['../scss/app.component.css']
})
export class AppComponent {
  title = 'epresented';
}
