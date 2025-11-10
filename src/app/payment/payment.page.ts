// src/app/payment/payment.page.ts
import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular/standalone';
// Import services and necessary Ionic components
import { CartService } from '../cart/cart.service'; 
import { AuthService } from '../services/auth.service'; // Added for login check
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonList, 
  IonItem,
  IonLabel,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonMenuButton // <-- CRITICAL FIX: ADD THIS IMPORT
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, walletOutline, cashOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule, 
    DecimalPipe, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton,
    IonList, 
    IonItem,
    IonLabel,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonMenuButton // <-- CRITICAL FIX: ADD THIS TO THE IMPORTS ARRAY
  ], 
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  // Services
  public cartService = inject(CartService); 
  private authService = inject(AuthService);
  router = inject(Router); 
  alertController = inject(AlertController);
  
  // Component State
  shippingFee: number = 50.00; 
  selectedMethod = signal<string | null>(null);
  private subtotal: number = 0; 
  
  // Computed Total
  finalTotal = computed(() => {
    return this.subtotal + this.shippingFee; 
  });
  
  // Check login status
  isLoggedIn = computed(() => !this.authService.isUserLoggedOutSync());


  constructor() {
    addIcons({ cardOutline, walletOutline, cashOutline, arrowBackOutline });
  }

  ngOnInit(): void {
    // Subscribe to the cart total stream to update the local subtotal variable
    this.cartService.total$.subscribe(total => {
        this.subtotal = total;
    });
  }

  selectPayment(method: string) {
    this.selectedMethod.set(method);
  }

  // Directs user to login page
  goToLogin() {
    this.router.navigate(['/login']); 
  }

  // Final Payment Simulation Logic
  async processPayment() {
    // SECURITY CHECK
    if (!this.isLoggedIn()) {
      this.goToLogin();
      return; 
    }
    
    if (!this.selectedMethod()) {
      const alert = await this.alertController.create({
        header: 'Missing Method',
        message: 'Please select a payment method to proceed.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const total = this.finalTotal();
    const method = this.selectedMethod();

    if (method === 'COD') {
        const alert = await this.alertController.create({
            header: 'Order Confirmed (COD)',
            subHeader: `Total: ₱${total.toFixed(2)}`,
            message: `Thank you! Your order will be paid upon delivery.`,
            buttons: [
                { text: 'OK', handler: () => {
                    this.cartService.clearCart();
                    this.router.navigate(['/order-history']); 
                }}
            ]
        });
        await alert.present();
    } else {
        const alert = await this.alertController.create({
            header: 'Simulate Digital Payment',
            subHeader: `Total: ₱${total.toFixed(2)}`,
            message: `Payment successful! Order processed via ${method}.`,
            buttons: [
                { text: 'OK', handler: () => {
                    this.cartService.clearCart(); 
                    this.router.navigate(['/order-history']); 
                }}
            ]
        });
        await alert.present();
    }
  }
}