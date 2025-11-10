import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList, // Added for the list
  IonItem, // Added for the list
  IonLabel, // Added for the list
  IonNote // Added for the list
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList, // Added
    IonItem, // Added
    IonLabel, // Added
    IonNote // Added
  ],
})
export class OrderHistoryPage implements OnInit {
  // Sample data (as provided previously)
  orders = [
    { id: 101, date: '2025-10-25', items: '2 Cookies, 1 Croissant', total: '₱325.00' },
    { id: 102, date: '2025-10-28', items: '1 Brownie, 1 Ensaymada', total: '₱130.00' },
  ];
  constructor() {}
  ngOnInit() {}
}