import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonListHeader
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  codeSlashOutline, 
  colorPaletteOutline, 
  logoFigma, 
  logoGithub 
} from 'ionicons/icons';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonListHeader 
  ]
})
export class DeveloperPage implements OnInit {

  constructor() {
    // Add the icons for the skills list
    addIcons({
      codeSlashOutline,
      colorPaletteOutline,
      logoFigma,
      logoGithub
    });
  }

  ngOnInit() {
  }

}