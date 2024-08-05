import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../services/authservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService, private router: Router,private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    
  }

  isAdmin(){
    if(this.tokenService.isAuthenticated() && this.tokenService.getUserRole()===0){
      return true;
    }else{
      return false;
    }
  }
  
  isUser(){
    if(this.tokenService.isAuthenticated() && this.tokenService.getUserRole()===1){
      return true;
    }else{
      return false;
    }
  }
  isArtist(){
    if(this.tokenService.isAuthenticated() && this.tokenService.getUserRole()===2){
      return true;
    }else{
      return false;
    }
  }

  checkLogin(){
    if(this.tokenService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }

  onLogoutClick(){
    this.tokenService.logout();
  }

  
}
