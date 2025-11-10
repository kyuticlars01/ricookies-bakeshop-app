// src/app/menu/menu.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- CRITICAL FIX: ADD THIS IMPORT
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonToast,
  ModalController,
  IonButton,
} from '@ionic/angular/standalone';
import { CartService, PastryItem } from '../cart/cart.service'; 
import { addIcons } from 'ionicons';
import { addCircle, cartOutline } from 'ionicons/icons'; 
import { ProductDetailModal } from './product-detail.modal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // <-- CRITICAL FIX: ADD THIS TO THE IMPORTS ARRAY
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonToast,
    IonButton, 
  ],
})
export class MenuPage implements OnInit {
  public menuItems: PastryItem[] = [
    {
      id: '1', 
      name: 'Classic Chocolate Cookies',
      description: 'Our signature soft and chewy cookie, loaded with rich semi-sweet chocolate chips.',
      price: '₱60.00',
      imageUrl: 'https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg',
    },
    {
      id: '2', 
      name: 'Red Velvet Cookies',
      description: 'A soft, chewy cookie with a hint of cocoa, vibrant red velvet color, and sweet cream cheese chips.',
      price: '₱75.00',
      imageUrl: 'https://www.simplyrecipes.com/thmb/_PUk-G30FxplaR92-5_UzkATnEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__01__Red-Velvet-Cookies-LEAD-01-6821503e276947a1a82dda01d95b9ff9.jpg',
    },
    {
      id: '3', 
      name: 'Dark Chocolate Cookies',
      description: 'A rich, decadent cookie made with dark cocoa powder and studded with intense dark chocolate chunks.',
      price: '₱75.00',
      imageUrl: 'https://wholesomepatisserie.com/wp-content/uploads/2021/07/Bakery-Style-Dark-Chocolate-Chip-Cookies-Featured-Image-500x500.jpg',
    },
    {
      id: '4', 
      name: 'Garlic Bread',
      description: 'Crispy, toasted baguette slices brushed with garlic-infused butter and herbs.',
      price: '₱100.00',
      imageUrl: 'https://www.ambitiouskitchen.com/wp-content/uploads/2023/02/Garlic-Bread-4.jpg',
    },
    {
      id: '5', 
      name: 'Caramelized Onion and Garlic Bread',
      description: 'A savory loaf topped with sweet, slow-cooked caramelized onions and melted cheese.',
      price: '₱150.00',
      imageUrl: 'https://hostthetoast.com/wp-content/uploads/2018/06/Caramelized-onion-garlic-bread-12.jpg',
    },
    {
      id: '6', 
      name: 'Onion Bread',
      description: 'A soft, pull-apart bread filled with fresh green onions and a savory buttery glaze.',
      price: '₱100.00',
      imageUrl: 'https://cookingwithawallflower.com/wp-content/uploads/2021/04/Green-Onion-Pull-Apart-Bread-1.jpg',
    },
    {
      id: '7', 
      name: 'Mocha Almond Fudge Brownies',
      description: 'A dense, fudgy brownie infused with rich coffee flavor, swirled with fudge and topped with toasted almonds.',
      price: '₱75.00',
      imageUrl: 'https://bakingthegoods.com/wp-content/uploads/2024/10/Mocha-Almond-Fudge-Cookies-43.jpg',
    },
    {
      id: '8', 
      name: 'Cheesy Ensaymada',
      description: 'A classic Filipino soft, sweet brioche pastry topped with butter, sugar, and abundant grated cheese.',
      price: '₱70.00',
      imageUrl: 'https://www.foxyfolksy.com/wp-content/uploads/2015/10/ensaymada-3.jpg',
    },
    {
      id: '9', 
      name: 'Classic Fudge Brownies',
      description: 'The perfect brownie: incredibly moist and fudgy with a rich, deep chocolate flavor and a crinkly top.',
      price: '₱60.00',
      imageUrl: 'https://bakerbettie.com/wp-content/uploads/2013/05/easy-brownie-recipe-1-700-x-700-px-1.jpg',
    },
    {
      id: '10', 
      name: 'Classic Croissant',
      description: 'A flaky, golden-brown pastry with delicate, buttery layers. Perfect with coffee.',
      price: '₱150.00',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpozfDwciEJGxxrKtcmYlQSwqWj5PKSj4pg&s',
    },
    {
      id: '11', 
      name: 'Ham and Cheese Croissant',
      description: 'Our classic butter croissant filled with savory ham and melted Swiss cheese.',
      price: '₱235.00',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUWxCw4FhrWMRHD9Z3toavT6SQgmHsghg_1g&s',
    },
    {
      id: '12', 
      name: 'Cinnamon Rolls',
      description: 'Soft, sweet dough swirled with a rich cinnamon-sugar filling and topped with cream cheese frosting.',
      price: '₱150.00',
      imageUrl: 'https://mccormick.widen.net/content/megysgsour/jpeg/Holiday_Cinnamon-Rolls_1376x774.jpeg',
    },
    {
      id: '13', 
      name: 'Cookies Croissant',
      description: 'The ultimate hybrid: a flaky croissant stuffed and topped with chocolate chip cookie dough.',
      price: '₱235.00',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXxhKaAD3i1R0JUF36k7TUO5K3IJ3wZ922sw&s',
    },
    {
      id: '14', 
      name: 'Bagel All Time Sandwich',
      description: 'A toasted everything bagel with scrambled eggs, crispy bacon, and melted cheddar cheese.',
      price: '₱235.00',
      imageUrl: 'https://www.layersofhappiness.com/wp-content/uploads/2023/07/Everything-Bagel-Breakfast-Sandwich-6-scaled.jpg',
    },
    {
      id: '15', 
      name: 'Giant Pretzel',
      description: 'A huge, oven-baked soft pretzel, lightly salted and served with a side of cheese dip.',
      price: '₱150.00',
      imageUrl: 'https://www.tasteofhome.com/wp-content/uploads/2024/11/Soft-Giant-Pretzels_TOHcom24_15761_DR_11_05_15b.jpg?fit=700%2C1024',
    },
  ];

  isToastOpen = false;
  toastMessage = '';

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {
    addIcons({ addCircle, cartOutline });
  }

  ngOnInit() {}

  async openProductModal(item: PastryItem) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailModal,
      componentProps: {
        item: item
      },
    });
    
    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm') {
      this.cartService.addToCart(item, data.quantity);
      this.showToast(`${data.quantity} x ${item.name} added to cart!`);
    }
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;
  }

  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}