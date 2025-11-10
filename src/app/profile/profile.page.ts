import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, bagHandleOutline, settingsOutline, logOutOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { UserDataService, UserProfile } from '../cart/user.service'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Enables routerLink
    AsyncPipe, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonAvatar,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
  ],
})
export class ProfilePage implements OnInit {
  
  public user$: Observable<UserProfile>; 

  // --- INJECT SERVICES ---
  private userDataService = inject(UserDataService);
  private authService = inject(AuthService); // <-- Add this
  private router = inject(Router); // <-- Add this

  constructor() { 
    addIcons({
      personCircleOutline,
      bagHandleOutline,
      settingsOutline,
      logOutOutline
    });
    
    // Fetch user data from the local service
    this.user$ = this.userDataService.getUser(); 
  }
  
  ngOnInit() {}

  // --- ADD THIS LOGOUT FUNCTION ---
  async logout() {
    await this.authService.signOut();
    // Redirect to login page after logout
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}