import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '@aerogear/auth';
import { authProvider } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [authProvider]
})

export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthService, public toastCtrl: ToastController) {
    this.auth = auth;
    this.toastCtrl = toastCtrl;
  }

  ionViewDidEnter(): void {
  }


}
