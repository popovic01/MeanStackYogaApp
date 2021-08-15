import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private isAdmin: any = false;
  private token: string | undefined;
  private authStatusListener = new Subject<boolean>();
  private isAdminListener = new Subject<boolean>();
  private tokenTimer: any;
  cartSubject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAdminListener() {
    return this.isAdminListener.asObservable();
  }

  createUser(email: string, password: string, fullName: string) {
    const authData: AuthData = { email: email, password: password, fullName: fullName };
    this.http
      .post("http://localhost:3000/user/signup", authData)
      .subscribe(() => {
        this.router.navigate(["/prijava"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password, fullName: ''};
    this.http.post<{token: string, expiresIn: number, isAdmin: boolean, id: string,
    fullName: string}>("http://localhost:3000/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        const isAdmin = response.isAdmin;
        const id = response.id;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.isAdmin = isAdmin;
          this.authStatusListener.next(true);
          this.isAdminListener.next(this.isAdmin);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, isAdmin, email, id);

          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.isAdmin = authInformation.isAdmin;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.isAdminListener.next(this.isAdmin);
    }
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authStatusListener.next(false);
    this.isAdminListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

   private setAuthTimer(duration: number) {
     console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
   }

  private saveAuthData(token: string, expirationDate: Date, isAdmin: boolean, email: string, id: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("isAdmin", new Boolean(this.isAdmin).toString());
    localStorage.setItem('username', email);
    localStorage.setItem('userId', id);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    localStorage.removeItem("localCart");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const isAdmin = localStorage.getItem("isAdmin");
    const username = localStorage.getItem("username");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token, 
      expirationDate: new Date(expirationDate),
      isAdmin: isAdmin,
      username: username
    }
  }

}