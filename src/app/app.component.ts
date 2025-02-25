import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';

import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  authService = inject(AuthService);
  // isLogin$ = this.authService.isAuthenticated$;

  ngOnInit(): void {
    
  }

  logout(){
    
    this.authService.signOut().subscribe(()=>{
      console.log('signed out')
    })
  }
}
