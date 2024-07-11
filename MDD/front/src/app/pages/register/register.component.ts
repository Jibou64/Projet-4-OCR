// src/app/pages/register/register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.firstName, this.lastName, this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
