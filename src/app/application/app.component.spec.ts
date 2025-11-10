import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonSplitPane, IonMenu, IonContent, IonList, IonMenuToggle, IonHeader, IonToolbar, IonTitle, IonIcon, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, cartOutline, menuOutline, personOutline, informationCircleOutline, callOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    RouterModule, 
    IonApp, 
    IonRouterOutlet, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList, 
    IonMenuToggle, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonIcon, 
    IonItem, 
    IonLabel
  ],
})
export class AppComponent {
  // Define the pages for the side menu navigation
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Menu', url: '/menu', icon: 'menu' },
    { title: 'Cart', url: '/cart', icon: 'cart' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'About', url: '/about', icon: 'information-circle' },
    { title: 'Contact', url: '/contact', icon: 'call' },
  ];

  constructor() {
    addIcons({ 
      homeOutline, 
      cartOutline, 
      menuOutline, 
      personOutline, 
      informationCircleOutline, 
      callOutline 
    });
  }
}
