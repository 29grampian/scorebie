import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, User,
  GoogleAuthProvider, signInWithPopup 
 } from '@angular/fire/auth';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth); // Inject Auth directly
  // isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }
  
    // Sign in method
    signIn(email: string, password: string): Observable<User | null> {
      return from(
        signInWithEmailAndPassword(this.auth, email, password).then(
          userCred =>{ 
            return userCred.user
          }
        )
      );
    }

    signInWithGoogle(): Observable<User | null> {
      const provider = new GoogleAuthProvider();
      return from(
        signInWithPopup(this.auth, provider).then(
          userCred => { 

            return userCred.user
           }
        )
      );
    }

    // Sign out method
    signOut(): Observable<void> {
    
      return from(
        signOut(this.auth)
      )
    }

      // Get the currently logged-in user
    getCurrentUser(): User | null {
      return this.auth.currentUser;
    }
  }
