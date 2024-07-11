// src/app/pages/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
