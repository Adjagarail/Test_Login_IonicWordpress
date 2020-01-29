import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticatorService } from "./authenticator.service";
import { HomePage } from "./home/home.page";
import { NavController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public navCtrl: NavController,
    private statusBar: StatusBar,
    private authenticator: AuthenticatorService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authenticator.getUser().then(
        data => {
          this.authenticator.validateAuthToken(data.token).subscribe(
            res => this.navCtrl.navigateRoot("/home"),
            err => this.navCtrl.navigateRoot("/home")
          );
        },
        err => this.navCtrl.navigateRoot("/home")
      );
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
