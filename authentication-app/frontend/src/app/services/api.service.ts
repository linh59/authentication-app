import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loggedStatus: boolean;

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  logOut(){
   
  }

  registerUser(user){
    this.http.post('http://localhost:3000/register', user).subscribe(res =>{
      console.log(res);
      if(res['status'] === 'success') {
        this.router.navigate(['/home']);
      } else {
        alert('Wrong username password');
      }
       
    }, error => {
      console.log('error is ', error);
    });
  }

  validateLogin(user: User){
		return this.http.post('http://localhost:3000/login',{
			email : user.email,
			password : user.password
    })
    
	}
}
