import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
    selector: 'page-certPinning',
    templateUrl: 'certPinning.html'
})
export class CertPinningPage {

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
        this.navCtrl = navCtrl;
    }

    ionViewDidEnter(): void {}
}
