// src/app/login/login.page.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; // <-- CRITICAL FIX: Add RouterModule
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenuButton,
  IonList, IonItem, IonLabel, IonInput, ToastController, IonButtons
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service'; 
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, // <-- FIX: Enables the routerLink in the HTML
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenuButton, 
    IonList, IonItem, IonLabel, IonInput, IonButtons
  ],
})
export class LoginPage implements OnInit {

  // Form Data
  email!: string;
  password!: string;

  // Dependencies
  private authService = inject(AuthService); 
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
    // Optional: If user is already logged in, redirect to home
    this.authService.user$.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });
  }

 async login() {
    if (!this.email || !this.password) {
      this.presentToast('Please enter both email and password.', 'danger');
      return;
    }

    try {
      await this.authService.signIn(this.email, this.password);
      
      this.presentToast('Login successful!', 'success');
      // The ngOnInit subscription will handle the redirect to /home
      
    } catch (error: any) {
      let message = 'Login failed. Please try again.';
      if (error instanceof FirebaseError) {
        // Handle specific auth errors
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            message = 'Invalid email or password.';
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
  
  // Note: Removed getFirebaseErrorMessage as requested and simplified error handling.
}