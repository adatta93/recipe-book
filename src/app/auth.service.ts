import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  isLoggedIn = false;

  constructor(private router: Router) {}

  isAuthenticated() {
    return new Promise((res, rej) =>
      setTimeout(() => res(this.isLoggedIn), 800)
    );
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(["/"]);
  }
}
