import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html'
})
export class DocumentationPage {
  linkParam: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.linkParam = navParams.get('linkParam')
  }

  ionViewWillEnter(): void { 
    window.open(`https://docs.aerogear.org/aerogear/latest/showcase/${this.linkParam}.html`, '_system')
    this.navCtrl.setRoot(HomePage);
  }
}