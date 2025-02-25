import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, RouterModule } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { AuthGuard } from './app/auth.guard';
import { LoginComponent } from './app/ui/login/login.component';
import { ScoresComponent } from './app/ui/scores/scores.component';
import { UsersComponent } from './app/ui/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'scores', component: ScoresComponent, canActivate: [AuthGuard] },
  { path: 'scores', component: ScoresComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },

];

bootstrapApplication(
  AppComponent, {
    providers: [
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),    
      provideRouter(routes)

    ]
  }
  
).catch((err) => console.error(err));
