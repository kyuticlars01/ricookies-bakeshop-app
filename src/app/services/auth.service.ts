import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  updateProfile // <-- ADD THIS IMPORT
} from '@angular/fire/auth'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private auth: Auth = inject(Auth); 
  public userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable(); 

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  public isUserLoggedOutSync(): boolean {
    return this.userSubject.value === null;
  }

  async signIn(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // --- UPDATED REGISTER FUNCTION ---
  async register(email: string, password: string, username: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    
    // --- ADD THIS BLOCK ---
    // This saves the username to the Firebase user's profile
    await updateProfile(userCredential.user, {
      displayName: username
    });
    // --------------------
    
    return userCredential.user;
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}