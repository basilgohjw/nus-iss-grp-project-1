import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: any;
  error = false;
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  validateEmail() {
    console.log("Validate email: ", this.loginForm.value.email);
    // if (this.loginForm.value.email != null &&   
    //  !(this.loginForm.value.email.indexOf('@') !== -1) && !(this.loginForm.value.email.indexOf('.') !== -1)) {
    //   console.log("Return false");
    //   return false;
    // } else {
    //   console.log("Return true");
    //   return true;
    // }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginForm.value.email) && this.loginForm.value.email != '' && this.loginForm.value.email != null) {
      // if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      return true;
    }
    return false;
  }

  login(): void {
    console.log("Login Form Value: ", this.loginForm.value);
    this.apiService.login(this.loginForm.value).
      subscribe(res => {
        console.log("Response: ", res);
        if (res.status == "200" && res.userType == "CUSTOMER") {
          this.apiService.storeToken(res.authToken, "customer");
          this.apiService.storeUserInfo(res.user);
          this.router.navigate(['/home']);
          this.snackBar.open('Logged in successfully :)', 'Close', { duration: 3000 });
          this.error = false;
        } else if (res.status == "200" && res.userType == "ADMIN") {
          this.apiService.storeToken(res.authToken, "admin");
          this.apiService.storeUserInfo(res.user);
          this.router.navigate(['/admin']);
          this.snackBar.open('Logged in successfully :)', 'Close', { duration: 3000 });
          this.error = false;
        }
      },
      err => {
        console.log(err);
        if (err.status == "404") {
          this.snackBar.open('Username is not found. Please try again :)', 'Close', { duration: 3000 });
        }
        if (err.status == "403") {
          this.snackBar.open('Invalid credentials. Please try again :)', 'Close', { duration: 3000 });
        }
        this.router.navigate(['/login']);
      });
  }
  
}
