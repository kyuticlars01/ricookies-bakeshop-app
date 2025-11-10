import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  username: string;
  email: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private defaultUser: UserProfile = {
    username: 'Rica Aquino',
    email: 'maricar.mac@email.com',
    avatarUrl: 'assets/pictures/Rica.jpg' 
  };

  private userSubject: BehaviorSubject<UserProfile>;
  public user$: Observable<UserProfile>;

  constructor() {
    // Initialize user state (no Firebase/local storage)
    this.userSubject = new BehaviorSubject<UserProfile>(this.defaultUser);
    this.user$ = this.userSubject.asObservable();
  }

  getUser(): Observable<UserProfile> {
    return this.user$;
  }

  updateUser(profile: UserProfile) {
    this.userSubject.next(profile); // Update state only locally
  }
}