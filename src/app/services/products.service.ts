// src/app/services/products.service.ts

// 1. Remove Observable from here
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore'; 
import { Injectable, inject } from '@angular/core';

// 2. Add this new import for Observable
import { Observable } from 'rxjs';
export interface Product {
  id?: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string; // Optional field
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private firestore: Firestore = inject(Firestore);
  
  // CRITICAL: Must match the collection ID you created
  private productsCollection = collection(this.firestore, 'products'); 

  constructor() { }

  getProducts(): Observable<Product[]> {
    const productsQuery = query(this.productsCollection);
    
    // idField: 'id' ensures the Firestore document ID is available as 'id' in your app
    return collectionData(productsQuery, { idField: 'id' }) as Observable<Product[]>;
  }
}