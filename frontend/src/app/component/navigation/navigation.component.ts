import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedType: string;

  constructor(private auth: ApiService, private route: Router, private snackBar: MatSnackBar) {

    if (this.auth.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.auth.getAuthType() == "customer") {
        this.loggedType = "customer";
      } else if (this.auth.getAuthType() == "admin") {
        this.loggedType = "admin";
      }
    }
  }

  ngOnInit() {

  }

  logout() {
    this.loggedType = "home";
    this.auth.removeToken();
    this.auth.logout();
    this.snackBar.open('You have been logged out.', 'Close', { duration: 3000 });
    this.route.navigate(['/login']);
  }

}
