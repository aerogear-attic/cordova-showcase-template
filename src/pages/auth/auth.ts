import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { authProvider } from '../../services/auth.service';
import { Auth } from '@aerogear/auth';
import { ToastController } from 'ionic-angular';
import { AuthDetailsPage } from '../authDetails/authDetails';
import { AlertService } from '../../services/alert.service';
import { constants } from '../../constants/constants';

@Component({
    selector: 'page-auth',
    templateUrl: 'auth.html',
    providers: [authProvider]
})
export class AuthPage {
    authButtonState: boolean;
    configValid: boolean;

    constructor(public toastCtrl: ToastController, private auth: Auth, public navCtrl: NavController, 
        public navParams: NavParams, private alert: AlertService) {
        this.auth = auth;
        this.authButtonState = true;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
    }

    login() {
        this.auth.login()
            .then(() => this.navCtrl.setRoot(AuthDetailsPage));
    }

    ionViewDidEnter(): void {
        if (this.auth.isAuthenticated()) {
            this.navCtrl.setRoot(AuthDetailsPage);
        } else {
            const configKeys: string[] = Object.keys(this.auth.getConfig()).toString().split(',');
            console.log(configKeys.length);
            if (configKeys.length <= 1 || configKeys.indexOf('url') === -1) {
                this.configValid = false;
                this.alert.showAlert(constants.idmMessage, constants.featureNotConfigured, 
                  constants.alertButtons, constants.showDocs, constants.idmUrl);
            } else {
                this.configValid = true;
            }
        }
    }
}
