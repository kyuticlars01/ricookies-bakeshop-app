import { Injectable, inject } from '@angular/core'; // <-- Add inject
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // <-- IMPORT AUTHSERVICE

export interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  // This is now just a fallback for when logged out
  private defaultUser: UserProfile = {
    username: 'Guest User',
    email: 'Please log in',
    avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg' // Default guest avatar
  };

  private userSubject: BehaviorSubject<UserProfile>;
  public user$: Observable<UserProfile>;

  // Inject AuthService
  private authService = inject(AuthService);

  constructor() {
    // Initialize with default user
    this.userSubject = new BehaviorSubject<UserProfile>(this.defaultUser);
    this.user$ = this.userSubject.asObservable();

    // --- NEW: Subscribe to auth changes ---
    this.authService.user$.subscribe(firebaseUser => {
      if (firebaseUser) {
        // User is logged in
        const newProfile: UserProfile = {
          // Use the displayName we saved during registration
          username: firebaseUser.displayName || 'Ricookies User', 
          email: firebaseUser.email || 'No Email', // Get email from Firebase
          // Use photoURL if it exists, otherwise use your default image
          avatarUrl: firebaseUser.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg' 
        };
        this.userSubject.next(newProfile);
      } else {
        // User is logged out, show default user
        this.userSubject.next(this.defaultUser);
      }
    });
  }

  getUser(): Observable<UserProfile> {
    return this.user$;
  }

  updateUser(profile: UserProfile) {
    // This is for the 'Edit Profile' page, it's fine
    this.userSubject.next(profile);
    // In a real app, you would also update the Firebase profile here
  }
}