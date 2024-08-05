import { Component,OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService) { }
  
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [''] // Assuming default role is 'User'
    });
  }

  register() {
    if (this.registrationForm.valid) {
      let role: UserRole;

      // Map the selected role value to the corresponding UserRole enum
      switch (parseInt(this.registrationForm.value.role)) {
        case 0:
          role = UserRole.Admin;
          break;
        case 1:
          role = UserRole.User;
          break;
        case 2:
          role = UserRole.Artist;
          break;
        default:
          role = UserRole.User; // Default to 'User' if role is not selected
      }

      const user = {
        name: this.registrationForm.value.name,
        userName: this.registrationForm.value.username,
        phone: this.registrationForm.value.phone,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        role: role
      };

      // Call the registration service
      // this.authService.register(user, imageFile: File).subscribe(
      //   (response) => {
      //     // Handle successful registration
      //     console.log('Registration successful', response);
      //     // Optionally, you can redirect the user to another page or perform other actions
      //   },
      //   (error) => {
      //     // Handle registration error
      //     console.error('Registration error', error);
      //     // Display error message to the user
      //     alert('Registration failed. Please try again.');
      //   }
      // );
    } else {
      // Form is invalid, handle accordingly
    }
  }
}


enum UserRole {
  Admin,
  User,
  Artist
}