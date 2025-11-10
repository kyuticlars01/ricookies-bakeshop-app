// src/app/application/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  
  // 1. SPLASH SCREEN ROUTE DEFINITION
  {
    path: 'splash',
    loadComponent: () => import('../splash/splash.page').then((m) => m.SplashPage),
  },
  
  // 2. PRIMARY PAGES (Keep all existing pages)
  {
    path: 'home',
    loadComponent: () => import('../home/home.page').then(m => m.HomePage)
  },
  {
    path: 'menu',
    loadComponent: () => import('../menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('../cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'payment',
    loadComponent: () => import('../payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('../profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'about',
    loadComponent: () => import('../about/about.page').then(m => m.AboutPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('../contact/contact.page').then( m => m.ContactPage)
  },
  
  // 3. SECONDARY PAGES (Profile Sub-links)
 {
  path: 'edit-profile',
  loadComponent: () => import('../edit-profile/edit-profile.page').then( m => m.EditProfilePage)
},
{
  path: 'order-history',
  loadComponent: () => import('../order-history/order-history.page').then( m => m.OrderHistoryPage)
},
{
  path: 'settings',
  loadComponent: () => import('../settings/settings.page').then( m => m.SettingsPage)
},
{
  path: 'login',
  loadComponent: () => import('../login/login.page').then( m => m.LoginPage)
},
{
  path: 'register', 
  loadComponent: () => import('../register/register.page').then( m => m.RegisterPage)
},
  // 4. CRITICAL FIX: Base path MUST redirect ONLY to splash
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
   
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
];