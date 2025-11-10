// src/app/menu/product-detail.modal.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonImg,
  IonFooter,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { PastryItem } from '../cart/cart.service'; 
import { addIcons } from 'ionicons';
import { add, remove, close } from 'ionicons/icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.modal.html',
  styleUrls: ['./product-detail.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonImg,
    IonFooter,
  ],
})
export class ProductDetailModal implements OnInit {
  @Input() item!: PastryItem;
  quantity: number = 1;

  constructor(private modalCtrl: ModalController) {
    addIcons({ add, remove, close });
  }

  ngOnInit() {}

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({ quantity: this.quantity }, 'confirm');
  }
}