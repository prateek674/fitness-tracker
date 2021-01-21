import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // getting access to the 'sidenav' reference in html file
  // @ViewChild('sidenav')
  title = 'fitness-tracker';

  // Injecting AuthService
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
