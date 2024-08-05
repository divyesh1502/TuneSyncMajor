import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../../services/song.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent  implements OnInit {

  users: any[];

  constructor(private http: HttpClient, private songService: SongService) { }

  ngOnInit() :void{ 
    this.getUsers();
  }

  getUsers(): void {
    this.songService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }
  
  softDeleteUser(userId: number): void {

    Swal.fire({
      title: 'Are you sure?',
      text: `Really you want to remove this user??`,
      icon: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.songService.softDeleteUser(userId).subscribe((res) =>{
          this.getUsers();
          this.users = this.users.filter(user => user.id !== userId);
        })
      }
    });
  }

}
