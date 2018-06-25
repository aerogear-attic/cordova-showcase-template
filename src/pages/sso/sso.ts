import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
    selector: 'page-sso',
    templateUrl: 'sso.html'
})
export class SSOPage {
    pageTitle: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.navCtrl = navCtrl;
        this.pageTitle = navParams.get('linkParam');
    }

    ionViewWillEnter(): void { 
        window.open('https://docs.aerogear.org/aerogear/latest/keycloak/index.html?sso=1', '_system')
        this.navCtrl.setRoot(HomePage);
      }
}
