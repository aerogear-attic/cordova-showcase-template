import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html'
})
export class DocumentationPage {
  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  ionViewDidEnter(): void { 
    window.open("https://aerogear.org", '_system')
    this.navCtrl.setRoot(HomePage);
  }
}
