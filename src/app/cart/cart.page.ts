// src/app/cart/cart.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonLabel,
  IonNote,
  IonButton,
  IonIcon,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline, trashOutline } from 'ionicons/icons';
import { CartService, CartItem } from './cart.service'; 
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonLabel,
    IonNote,
    IonButton,
    IonIcon,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
  ],
})
export class CartPage implements OnInit, OnDestroy {
  cartItems$: Observable<CartItem[]> = this.cartService.cart$;
  total$: Observable<number> = this.cartService.total$; 
  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({ addCircleOutline, removeCircleOutline, trashOutline });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.cartItems$.subscribe(items => console.log('Cart Items:', items)),
      this.total$.subscribe(total => console.log('Cart Total:', total))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public parsePrice(price: string | number): number {
    if (typeof price === 'number') {
        return price;
    }
    const numericPrice = price.replace(/[^0-9.]/g, '');
    return parseFloat(numericPrice) || 0;
  }

  increaseQuantity(productId: string, currentQuantity: number) {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    } else {
      this.cartService.removeItem(productId);
    }
  }

  removeFromCart(productId: string) {
    this.cartService.removeItem(productId);
  }

  // FIX: Single, correct function to navigate to the PaymentPage component
 // src/app/cart/cart.page.ts (Snippet of the Fix)

// ... (methods before proceedToCheckout) ...

  async proceedToCheckout() {
    // 1. Check if the cart is empty (good practice)
    const cartItems = await this.cartService.cart$.pipe(first()).toPromise();
    if (!cartItems || cartItems.length === 0) {
      const alert = await this.alertController.create({
        header: 'Cart Empty',
        message: 'Please add items to your cart before checking out.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    
    // 2. ACTION: Navigate directly to the Payment page
    this.router.navigate(['/payment']); 
  }

}