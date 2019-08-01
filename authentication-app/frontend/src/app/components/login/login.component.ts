import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user : User;
  constructor(
    private apiService: ApiService,
    private router: Router) {
      this.user = new User();
     }

  ngOnInit() {
  }
  
  validateLogin() {
    if(this.user.email && this.user.password) {
        this.apiService.validateLogin(this.user).subscribe(result => {
        if(result['status'] === 'success') {
          this.router.navigate(['/home']);
        } else {
          alert('Wrong username password');
        }
         
      }, error => {
        console.log('error is ', error);
      });
    } else {
        alert('enter user name and password');
    }
  }

}
