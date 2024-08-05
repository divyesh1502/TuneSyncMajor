import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { TokenService } from '../../../services/token.service';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../../../services/song.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit{

  profileForm: FormGroup;
  isUpdating: boolean = false;
  profileData: any; // Variable to store pre-existing profile data

  imageFile: File =null;

  showUserImg: string = '';
  private apiUrl = 'https://localhost:7185/api';
  id: number;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string;
  userService: any;
  successMessage: any;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient, private profileService: ProfileService, private tokenService: TokenService, private route: ActivatedRoute, private songService: SongService) {}

  ngOnInit(): void {
    this.createForm();
    this.getProfileData();
    this.showUserImg = this.tokenService.getUserImg();
    this.id = this.tokenService.getUserID();
    console.log(this.id);

    this.passwordForm = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.passwordMatchValidator // Custom validator for matching passwords
    });
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required]],
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
      cpassword: new FormControl(null, [Validators.required]),
      avatar: [null] // We'll handle file validation separately
    });
  }

  onFileSelected(event: any): void {
    
    const fileInput = event.target.files[0];
    this.imageFile = event.target.files[0];

    if (event.target.files.length > 0) {
      this.showUserImg = fileInput.name;
      this.profileForm.get('avatar').setValue(fileInput.name);
    }
  }

  getProfileData(): void {
    this.profileService.getProfileData(this.tokenService.getUserID())
      .subscribe(
        data => {
          this.profileData = data;
          console.log(this.profileData);
          
          // Populate form fields with pre-existing data
          this.profileForm.patchValue({
            fullName: this.profileData.name,
            phone: this.profileData.phone,
            // You can similarly populate other form fields here
          });
        },
        error => {
          console.error('Error fetching profile data:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.profileForm.valid && !this.isUpdating) {
      this.isUpdating = true;
      const userData = {
        name: this.profileForm.value.fullName,
        phone: this.profileForm.value.phone,
      };



      this.profileService.updateProfile(this.tokenService.getUserID(), userData, this.imageFile)
        .subscribe(
          response => {
            console.log('Profile updated successfully:', response);
            alert('Profile updated successfully');
            this.getProfileData();
            this.isUpdating = false;
          },
          error => {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again later.');
            this.isUpdating = false;
          }
        );
    } else {
      console.log('Form is invalid or update is already in progress.');
    }
  }

  
  

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password must match.';
      return;
    }

    this.songService.updatePassword(this.id, this.oldPassword, this.newPassword)
      .subscribe(
        response => {
          this.successMessage = response.message; // Success message
          this.clearForm();
          Swal.fire('Password Updated!', ``, 'success');
        },
        error => {
          this.errorMessage = 'Failed to update password. ' + error.error.message; // Error message
          Swal.fire('Invalid!', `${this.errorMessage}`, 'error');

          // alert(this.errorMessage);
        }
      );
  }
  
  clearForm() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword').value;
    const confirmPassword = group.get('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      group.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      group.get('confirmPassword').setErrors(null);
    }
  }

  toggleNavigation() {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }
}
