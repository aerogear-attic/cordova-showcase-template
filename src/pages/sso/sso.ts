import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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
}
