import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);
  isLogin = false;
  ngOnInit(): void {
    console.log(this.authService.getCurrentUser())
    // if(sessionStorage.getItem('isLogin'))
    if (this.authService.getCurrentUser()) {
      this.isLogin = true;
      console.log('islogin', this.isLogin)
    } else {
      console.log('not islogin', this.isLogin)

    };
  }
  login() {
    this.authService.signIn(this.email, this.password).subscribe(

      user => {
        console.log('Logged in:', user);
        if (user) {
          // sessionStorage.setItem('isLogin', 'y');
          this.router.navigate(['/scores']);  // Redirect to dashboard
        }
      }, 
      error => {
        console.error('Login failed:', error);
      });
  }

  loginWithGoogle() {
    this.authService.signInWithGoogle().subscribe(
      user => {
        console.log('Google Sign-In successful:', user);
        if (user) this.router.navigate(['/scores']);
      },
      error => console.error('Google Sign-In failed:', error));
  }

  logout() {
    this.authService.signOut().subscribe(() => {
      console.log('Logged out');
      this.isLogin = false;
      
      this.router.navigate(['/login']);
    });
  }
}