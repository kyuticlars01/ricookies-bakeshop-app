import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

// Import necessary Firebase providers
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Import your main component and routing module
import { AppComponent } from './application/app.component'; 


@NgModule({
  // IMPORTANT: The AppComponent must be imported as a standalone component in the template
  // If your project uses the standard routing setup, the declarations array should be minimal
  declarations: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    // Your main routing module
    
    // The main app component must be imported for the module to bootstrap it
    AppComponent, 
  ],
  
  // ✅ FIX: The providers array must contain all Firebase services
  providers: [
    // This is the CRITICAL FIX for NG0201 (No provider found for 'Firestore')
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  // The bootstrap component is usually handled by main.ts, but kept here for Ionic structure
  bootstrap: [], 
})
export class AppModule { }
