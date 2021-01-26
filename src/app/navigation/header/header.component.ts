import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Output allows listening from outside
  // EventEmitter allows to emit to outside
  // void because we want void type when nothing is there
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // subscribing to authChange in auth.service.ts
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    // to save memory. Doesn't happend automatically
    this.authSubscription.unsubscribe();
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
