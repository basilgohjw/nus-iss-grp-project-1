import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit() {}
  
  createForm() {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      username: '',
      age: '',
      usertype: 'customer'
    });
  }

  validateEmail() {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.registerForm.value.email)) && this.registerForm.value.email != '' && this.registerForm.value.email != null) {
      return true;
    }
    return false;
  }

  validateRegisterButton() {
    if ((this.registerForm.value.email == null || this.registerForm.value.email == '') || (this.registerForm.value.password == null || this.registerForm.value.password == '') || 
      (this.registerForm.value.password != '' && this.registerForm.value.password.length < 8)) {
      return true;
    }
    return false;
  }

  validatePwCount() {
    if (this.registerForm.value.password != '' && this.registerForm.value.password.length < 8) {
      return true;
    }
    return false;
  }

  register(): void {
    this.apiService.register(this.registerForm.value).
      subscribe(res => {
        if (res.status == "400") {
          console.log("Details cannot be empty :)");
          this.snackBar.open('An error has been occured. Please try again :)', 'Close', { duration: 3000 });
        } else {
          this.router.navigate(['/login']);
          this.snackBar.open('Your account has been registered successfully. Please login :)', 'Close', { duration: 3000 });
        }
      },
      err => {
        this.snackBar.open('An error has been occured. Please try again :)', 'Close', { duration: 3000 });
      });
  }
  
}

