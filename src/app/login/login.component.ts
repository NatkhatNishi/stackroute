import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl();
  password = new FormControl();

  submitMessage = '';
  constructor(private authService: AuthenticationService, private routeService: RouterService) { }

  ngOnInit() {
  }

  loginSubmit() {
    const user = {
      username: this.username.value,
      password: this.password.value,
    };

    console.log(user);

    this.authService.authenticateUser(user).subscribe(
      data => {
        console.log(data);
        this.authService.setBearerToken(data['token']);
        this.routeService.routeToDashboard();
      },
      loginError => {
        console.log(loginError);
        if (loginError.status === 404) {
          this.submitMessage = loginError.message;
        } else {
          this.submitMessage = loginError.error.message;
        }
      }
    );
  }
}
