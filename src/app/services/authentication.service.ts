import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(user) {
    return this.httpClient.post('http://localhost:3000/auth/v1/', user);
  }

  setBearerToken(token) {
    localStorage.setItem('keeptoken', token);
  }

  getBearerToken() {
    return localStorage.getItem('keeptoken');
  }

  isUserAuthenticated(token): Promise<boolean> {

    // console.log('checking if user authenticated');
    return this.httpClient.post('http://localhost:3000/auth/v1/isAuthenticated', null,
      {
        headers: new HttpHeaders().set(
          'Authorization', `Bearer ${token}`
        )
      }
    )
      .pipe(map(response => {
        console.log(response);
        return response['isAuthenticated'];
      }))
      .toPromise();
  }
}

