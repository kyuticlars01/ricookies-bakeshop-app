// src/app/edit-profile/edit-profile.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
// Import user service from cart folder
import { UserDataService, UserProfile } from '../cart/user.service'; 
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    AsyncPipe, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ],
})
export class EditProfilePage implements OnInit {
  profileForm: FormGroup;
  currentUser!: UserProfile;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatarUrl: [''] 
    });
  }

  ngOnInit() {
    this.userDataService.getUser().subscribe(user => {
      this.currentUser = user;
      this.profileForm.patchValue({
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl
      });
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedUser: UserProfile = {
        username: this.profileForm.value.username,
        email: this.profileForm.value.email,
        avatarUrl: this.profileForm.value.avatarUrl || this.currentUser.avatarUrl
      };
      
      this.userDataService.updateUser(updatedUser);
      this.router.navigate(['/profile']);
    }
  }
}