import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ClarityModule, ClrMainContainerModule, ClrNavigationModule} from "@clr/angular";
import {AuthService} from "./services/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClrMainContainerModule,
    ClrNavigationModule,
    ClarityModule,
    NgIf
  ],
  providers: [AuthService, Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-app-frontend';

  get userName() {
    return localStorage.getItem('userName');
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  constructor(public authService: AuthService, private router: Router) {
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
