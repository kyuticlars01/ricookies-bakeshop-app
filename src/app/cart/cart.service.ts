// src/app/cart/cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// REMOVED FIREBASE IMPORTS for clean non-Firebase code

// Define interfaces for consistency across the app
export interface PastryItem {
  id: string;
  name: string;
  description: string;
  price: string; 
  imageUrl: string;
}

export interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number; // Price as number for calculation
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  
  public total$: Observable<number> = this.cart$.pipe(
    map(items => this.calculateTotal(items))
  );

  constructor() {
    // In a real app, load from LocalStorage here
  }

  private parsePrice(priceString: string): number {
    const numericPrice = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericPrice) || 0;
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(item: PastryItem, quantity: number): void {
    const currentCart = this.cartSubject.getValue();
    const priceValue = this.parsePrice(item.price);
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: priceValue,
        quantity: quantity
      };
      currentCart.push(newItem);
    }
    this.cartSubject.next([...currentCart]);
  }

  // FIX: Completed method to prevent crash
updateQuantity(itemId: string, newQuantity: number): void {
  const currentCart = this.cartSubject.getValue();
  const itemIndex = currentCart.findIndex(item => item.id === itemId); 
  
  if (itemIndex > -1) {
    currentCart[itemIndex].quantity = newQuantity;
    this.cartSubject.next([...currentCart]); // Emit new state
  }
}

// FIX: Change parameter type to string
removeItem(itemId: string): void {
  const currentCart = this.cartSubject.getValue();
  const newCart = currentCart.filter(item => item.id !== itemId);
  this.cartSubject.next(newCart);
}

  clearCart(): void {
    this.cartSubject.next([]);
  }
}