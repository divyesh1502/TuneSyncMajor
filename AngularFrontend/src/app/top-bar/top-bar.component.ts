import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {
  username: string = '';
  userImg: string = '';
  searchTerm: string = '';

  showSearch:boolean = true;

  @Output() toggleMenu = new EventEmitter<void>();

  constructor(private tokenService: TokenService, private router: Router, private sharedService: SearchService) {

  }

  ngOnInit(): void {
    if (this.tokenService.isAuthenticated()) {
      this.username = this.tokenService.getUserName().split(" ")[0];
      this.userImg = this.tokenService.getUserImg();
    }

    this.isShowSearch();
  }


  onClickToggle() {
    this.toggleMenu.emit();
  }

  checkLogin() {
    if (this.tokenService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  navigateToSearchList() {
    this.router.navigate(['/home/search']);
  }

  onSearchChange() {
    this.sharedService.setSearchTerm(this.searchTerm);
  }

  isShowSearch(){
    if(this.tokenService.getUserRole()===0 || this.tokenService.getUserRole()===2){
      this.showSearch = false;
    }
  }
}
