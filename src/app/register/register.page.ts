// src/app/register/register.page.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
  IonList, IonItem, IonLabel, IonInput, ToastController, IonBackButton, IonButtons, IonMenuButton
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service'; 
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, 
    IonList, IonItem, IonLabel, IonInput, IonBackButton, IonButtons, IonMenuButton
  ],
})
export class RegisterPage implements OnInit {

  // Form Data Model
  username!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  // Dependencies
  private authService = inject(AuthService); 
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() { }

  ngOnInit() { }

async register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.presentToast('All fields are required.', 'danger');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.presentToast('Passwords do not match.', 'danger');
      return;
    }
    
    try {
      // --- THIS IS THE UPDATED LINE ---
      // We now pass the username to the auth service
      await this.authService.register(this.email, this.password, this.username);
      // --------------------------------

      this.presentToast('Registration successful! Please log in.', 'success');
      this.router.navigate(['/login']);

    } catch (error: any) {
      let message = 'Registration failed. Please try again.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'This email address is already in use.';
            break;
          case 'auth/weak-password':
            message = 'Password is too weak. Must be at least 6 characters.';
            break;
          case 'auth/invalid-email':
            message = 'Please enter a valid email address.';
            break;
        }
      }
      this.presentToast(message, 'danger');
    }
  }
  
  // Utility to display toast messages
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}