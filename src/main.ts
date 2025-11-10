import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/application/app.component';
import { environment } from './environments/environment';

import { provideRouter } from '@angular/router';
import { routes } from './app/application/app.routes'; 
import { provideIonicAngular } from '@ionic/angular/standalone'; // <-- CRITICAL FIX

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // FIX: Provide necessary Ionic services (like ModalController and AlertController) globally
    provideIonicAngular(), 

    // Provide the Router
    provideRouter(routes), 
    
    // NOTE: All Firebase providers have been removed as requested.
  ],
}).catch(err => console.error(err));