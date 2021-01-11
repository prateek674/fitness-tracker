import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // getting access to the 'sidenav' reference in html file
  // @ViewChild('sidenav')
  title = 'fitness-tracker';
}
