import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '@aerogearservices/auth';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
declare var require: any
var keycloakConfig = require('../../config/keycloak.json');
declare let window: any;

@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
    providers: [AuthService]
})
export class AuthPage {
    authButtonState: boolean;

    constructor(public toastCtrl: ToastController, private auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
        this.auth = auth;
        this.authButtonState = true;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
    }

    login() {
        this.auth.login()
    }

    ionViewDidEnter(): void {
    }
}
