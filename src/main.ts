// 1. REMOVE importProvidersFrom from this line
import { enableProdMode } from '@angular/core'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/application/app.component';
import { environment } from './environments/environment';

import { provideRouter } from '@angular/router';
import { routes } from './app/application/app.routes'; 
import { provideIonicAngular } from '@ionic/angular/standalone';

// add firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // Provide Ionic Angular
    provideIonicAngular(), 
    // Provide the Router
    provideRouter(routes), 
    
    // 2. REMOVE the importProvidersFrom() wrappers
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
}).catch(err => console.error(err));