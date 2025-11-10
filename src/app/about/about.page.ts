// src/app/about/about.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';
import { SafeUrlPipe } from '../pipes/safe-url.pipe'; 

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SafeUrlPipe
  ]
})
export class AboutPage {

  ownerImageUrl: string = 'assets/pictures/rica.jpg'; 
  ownerFullName: string = 'Maricar Macarubbo Aquino';
  facebookUrl: string = 'https://www.facebook.com/profile.php?id=61573779209963';
  facebookLogoUrl: string = 'assets/pictures/fb.logo.png'; 
  
  originStory: string = `One of the local pastries in the Philippines founded in 2020 called 'Ricookies and Joe' and became a popular local pastry shop known for a delightful variety of pastries such as Cookies, Ensaymada, Brownies, Garlic Bread, Onion Bread. It is all crafted from scratch with passion and fresh ingredients. Unfortunately, in 2023, the owner decided to close the company due to personal circumstances and left the beloved pastries shop. In 2025, 'Ricookies' was reborn with a fresh vision and new Facebook Page that still offers varieties of pastries that focus on quality and delicious pastries.`;
  
  locationAddress: string = '125 L. Wood Rd, Brgy. Dolores, Taytay, 1870 Rizal';

  locationMapUrl: string = 'https://maps.app.goo.gl/1ooURjvTZGsuCkkR8'; 

  embedMapUrl: string = 'https://maps.google.com/maps?q=125+L.+Wood+Rd,+Brgy.+Dolores,+Taytay,+1870+Rizal&t=&z=15&ie=UTF8&iwloc=&output=embed'; 

  constructor() {
    addIcons({ locationOutline });
  }

  openLink(url: string) {
    window.open(url, 'https://maps.app.goo.gl/1ooURjvTZGsuCkkR8');
  }
}