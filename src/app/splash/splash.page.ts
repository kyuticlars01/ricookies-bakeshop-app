import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

// Define the timing constants for 5 seconds total duration
const TOTAL_SPLASH_TIME = 5000; // 5 seconds
// The zoom-out transition takes 500ms, so it must start at 4500ms (5000 - 500)
const FINAL_ZOOM_START = 4500; 

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
    // Step 1: Trigger the zoom-out animation and hide text at 4.5 seconds
    setTimeout(() => {
        const logo = document.querySelector('.rotating-logo');
        const appName = document.querySelector('.app-name');
        const welcome = document.querySelector('.welcome-message');

        // Add the class that triggers the final, fast zoom-out (500ms duration)
        logo?.classList.add('zoom-out');
        
        // Hide initial text
        appName?.classList.add('hidden');
        
        // Show the Welcome Message
        welcome?.classList.add('show');

    }, FINAL_ZOOM_START);

    // Step 2: Navigate after the total time (5 seconds)
    setTimeout(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }, TOTAL_SPLASH_TIME);
  }
}