import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder) {
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
    this.apiService.login(this.loginForm.value).
      subscribe(res => {
        if (res.status == "200" && res.userType == "CUSTOMER") {
          this.apiService.storeToken(res.authToken, "customer");
          this.router.navigate(['/home']);
          this.error = false;
        } else if (res.status == "200" && res.userType == "ADMIN") {
          this.apiService.storeToken(res.authToken, "admin");
          this.router.navigate(['/admin']);
          this.error = false;
        }
      },
      err => {
        console.log(err);
        if (err.status == "404") {
          alert("Username is not found. Please try again :)");
        }
        if (err.status == "403") {
          alert("Invalid password. Please try again :)");
        }
        this.router.navigate(['/login']);
      });
  }
  
}
