import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
//import { MustMatch } from './_helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private apiService: ApiService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser(user){
    this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
      this.apiService.registerUser(user);  
  }

}
