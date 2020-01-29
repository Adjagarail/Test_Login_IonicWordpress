import { Component } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { NavController, LoadingController } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
import { PostPage} from '../post/post.page';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticatorService } from '../authenticator.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  url: string = "http://taniere.demat-academy.com/";
  items: any = [];
  login_form: FormGroup;
  error_message: string;
  constructor(
    private nativeStorage: NativeStorage,
    public navCtrl: NavController,
    public http: HttpClient, 
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public authenticator: AuthenticatorService
  ) {}

  ionViewWillLoad() {
    this.login_form = this.formBuilder.group({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.required)
    });
  }
  async login(value) {
    let loading = await this.loadingCtrl.create();
    loading.present();

    this.authenticator
      .doLogin(value.username, value.password)
      .subscribe(
        res => {
          this.authenticator.setUser({
            token: res.json().token,
            username: value.username,
            displayname: res.json().user_display_name,
            email: res.json().user_email
          });

          loading.dismiss();
          this.navCtrl.navigateRoot("/post");
        },
        err => {
          loading.dismiss();
          this.error_message =
            "Invalid credentials. Try with username 'aa' password 'aa'.";
          console.log(err);
        }
      );
  }

  skipLogin() {
    this.navCtrl.navigateRoot("/post");
  }

  goToRegister() {
    this.navCtrl.navigateForward("/list");
  }
}
