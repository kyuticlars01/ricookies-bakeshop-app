// src/app/application/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  restaurantOutline,
  cartOutline,
  personOutline,
  informationCircleOutline,
  mailOutline,
  cardOutline, 
  logInOutline, // <-- NEW ICON
  personAddOutline,// <-- NEW ICON
  codeSlashOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonIcon,
    IonLabel,
  ],
})
export class AppComponent {
  constructor() {
    // Initializes icons used in the side menu
    addIcons({
      homeOutline,
      restaurantOutline,
      cartOutline,
      personOutline,
      informationCircleOutline,
      mailOutline,
      cardOutline,
      logInOutline, // <-- ADDED
      personAddOutline,
      codeSlashOutline // <-- ADDED
    });
  }
}