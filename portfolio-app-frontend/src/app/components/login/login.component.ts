import {Component, OnDestroy} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ClarityModule} from '@clr/angular';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ClarityModule,
    RouterOutlet,
    FormsModule,
    NgIf
  ],
  providers:[AuthService, Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public successMessage: string = '';
  public isRegister: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  public login() {
    this.clearMessages();
    this.authService.login(this.username, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const token = res.jwt;
          if (token) {
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', this.username);
            this.router.navigate(['/portfolios']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
      });
  }

  public register(): void {
    this.clearMessages();
    this.authService.register(this.username, this.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.successMessage = res.message;
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
      });
  }

  public clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
