// src/app/services/auth.service.ts

import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  public userSubject = new BehaviorSubject<any | null>(null); 
  public user$: Observable<any | null> = this.userSubject.asObservable(); 

  ngOnInit() {
      this.userSubject.next(null);
  }

  // CRITICAL FIX: Provides a synchronous way for components to check login status
  public isUserLoggedOutSync(): boolean {
      return this.userSubject.value === null;
  }

  // Placeholder function for sign-in
  async signIn(email: string, password: string): Promise<void> {
    this.userSubject.next({ uid: 'simulated-user-id' }); 
    console.log("Simulated sign in successful.");
  }
}