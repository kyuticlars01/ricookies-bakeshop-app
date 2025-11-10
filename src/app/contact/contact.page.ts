import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Needed for two-way binding in forms
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonIcon,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, callOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // <-- Include Forms Module
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonIcon,
    IonLabel,
    IonButtons,
    IonMenuButton,
    IonInput,
    IonTextarea,
    IonButton
  ],
})
export class ContactPage implements OnInit {
  
  // Sample form data model
  contactForm = {
    name: '',
    email: '',
    message: ''
  };
  
  constructor() {
    addIcons({ locationOutline, callOutline, mailOutline });
  }

  ngOnInit() {}
  
  submitMessage() {
    // In a real app, this is where you'd call an API service.
    console.log('Sending message:', this.contactForm);
    alert(`Thank you, ${this.contactForm.name}! Your message has been noted.`);
    
    // Reset form after submission
    this.contactForm = { name: '', email: '', message: '' };
  }
}