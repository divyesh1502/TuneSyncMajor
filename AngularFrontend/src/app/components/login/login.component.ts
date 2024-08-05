import { Component, ElementRef, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';
import { CustomValidators } from '../../validators/custom.validator';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registrationForm!: FormGroup;

  imageFile: File;

  showUserImg: string = 'us2.png';

  @ViewChild('flip') flipButton: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService, private router: Router, private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registrationForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
      cpassword: new FormControl(null, [Validators.required]),
      role: new FormControl(""),
      userImg: new FormControl(null)

    },
      {
        validators: CustomValidators.passwordMismatch
      });
  }

  onFileSelected(event: any): void {

    const fileInput = event.target.files[0];
    this.imageFile = event.target.files[0];

    if (event.target.files.length > 0) {
      this.showUserImg = fileInput.name
      this.registrationForm.get('userImg').setValue(fileInput.name);
    }
  }


  login() {

    if (this.loginForm.valid) {
      // Call your authentication service to login
      const user = {
        "userEmail": this.loginForm.value.email,
        "password": this.loginForm.value.password,
      };

      this.authService.login(user).subscribe(
        (response) => {
          // Handle successful login
          // alert('Logged in successfully');

          if (response.user.isApproved === 1) {
            Swal.fire('Logged in successfully!', `Enjoy the TuneSync`, 'success');
            // const decodedToken = jwtDecode(response.token);
            // console.log(decodedToken);
            // console.log(this.getUserDataFromToken(decodedToken));

            // localStorage.setItem('token', response.token);
            this.tokenService.setToken(response.token);
            console.log(this.tokenService.getUserRole());

            switch (this.tokenService.getUserRole()) {
              case 0:
                this.router.navigate(['/admin/dashboard']);
                break;
              case 1:
                this.router.navigate(['/home']);
                break;
              case 2:
                this.router.navigate(['/artist/dashboard']);
                break;
              default:
                break;
            }
          } else {
            Swal.fire(`Wait ${response.user.name.split(" ")[0]}!`, 'Please wait for approval from admin.', 'info');
          }

          this.loginForm.reset();


        },
        (error) => {
          // Handle login error
          console.error('Login error', error);
          // Display error message to the user
          // alert('Login failed. Invalid email or password.');
          Swal.fire('Invalid!', 'Please enter the correct credentials to login!!', 'error');
          this.loginForm.reset();
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }


  register() {
    const names = this.registrationForm.value.name.split(" ");
    var username = names[0].toLowerCase() + "_" + (Math.floor(Math.random() * 900) + 100).toString();
    // console.log(username);

    const user = {
      name: this.registrationForm.value.name,
      phone: this.registrationForm.value.phone,
      username: username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      role: this.registrationForm.value.role,
      isApproved: this.registrationForm.value.role == 1 ? 1 : 0,
    };


    // Call the registration service
    this.authService.register(user, this.imageFile).subscribe(
      (response) => {
        // Handle successful registration
        console.log('Registration successful', response);
        this.registrationForm.reset();
        this.showUserImg = 'us2.png';
        this.registrationForm.patchValue({
          role: ""
        })
        Swal.fire('Account Created!', `${response.message}`, 'success');
        if (this.flipButton && this.flipButton.nativeElement instanceof HTMLElement) {
          this.flipButton.nativeElement.click();
        }
      },
      (error) => {
        // Handle registration error
        console.error('Registration error', error);
        // Display error message to the user
        // alert('Registration failed. Please try again.');
        Swal.fire('Oops!', `Registration failed. Please try again.`, 'error');
      }
    );

  }


}


enum UserRole {
  Admin,
  User,
  Artist
}
