// src/app/login/login.page.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; // <-- CRITICAL FIX: Add RouterModule
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenuButton,
  IonList, IonItem, IonLabel, IonInput, ToastController 
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service'; 
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';

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
    IonList, IonItem, IonLabel, IonInput
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
    try {
      // Calls the simulated login method
      await this.authService.signIn(this.email, this.password);
      
      // Navigate to home upon success
      this.presentToast('Login successful!', 'success');
      this.router.navigate(['/home']);

    } catch (error: any) {
      this.presentToast('Simulated login failed.', 'danger');
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