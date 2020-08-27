import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  credentials = {
    fullname: null,
    password: null
  }

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit() {
  }

  login(): void {
    this.service.login(this.credentials).subscribe(
      (data: any) => {
        localStorage.setItem("client-token", data.token);
        this.router.navigate(["survey"]);
      },
      error => {
        console.log(`Error in obtaining token ${error}`);
      }
    );
  }
}
