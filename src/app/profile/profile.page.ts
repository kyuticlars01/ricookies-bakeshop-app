import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router'; 
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
// NOTE: Assumes user.service.ts is located in the '../cart/' directory
import { UserDataService, UserProfile } from '../cart/user.service'; 

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

  constructor(private userDataService: UserDataService) { 
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
}
