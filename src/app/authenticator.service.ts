import { Injectable } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { HttpClient } from "@angular/common/http";
import { Headers } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class AuthenticatorService {
  // Link to wordpress website
  url: string = "http://taniere.demat-academy.com/";
  // Link to wordpress user
  urls: string = "http://taniere.demat-academy.com/wp-json/wp/v2/";

  constructor(public nativeStorage: NativeStorage, public http: HttpClient) {}

  getUser() {
    return this.nativeStorage.getItem("User");
  }

  setUser(user) {
    return this.nativeStorage.setItem("User", user);
  }

  logOut() {
    return this.nativeStorage.clear();
  }

  doLogin(username, password) {
    return this.http.post(this.url + "wp-json/jwt-auth/v1/token", {
      username: username,
      password: password
    });
  }
  doRegister(user_data, token) {
    return this.http.post(this.urls + "users?token=" + token, user_data);
  }
  validateAuthToken(token) {
    let header: Headers = new Headers();
    header.append("Authorization", "Basic " + token);
    return this.http.post(
     this.url +
        "wp-json/jwt-auth/v1/token/validate?token=" +
        token,
      {},
      { }
    );
  }
}
