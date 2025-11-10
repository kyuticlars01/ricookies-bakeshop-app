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
    // 1. Basic validation (matching PHP logic)
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.presentToast('All fields are required.', 'danger');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.presentToast('Passwords do not match.', 'danger');
      return;
    }
    
    // 2. Simulate database registration
    try {
      // NOTE: In a real Angular app, this would use the AuthService to call Firebase signUp
      // We simulate success here.
      
      // Simulate unique check (optional logic, removed for simplicity)
      // await this.authService.signUp(this.email, this.password, this.username); 

      this.presentToast('Registration successful! Please log in.', 'success');
      
      // Navigate to the login page after successful simulation
      this.router.navigate(['/login']);

    } catch (error: any) {
      this.presentToast('Registration failed. Please try a different email.', 'danger');
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