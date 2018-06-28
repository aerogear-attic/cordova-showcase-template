import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-documentation',
  templateUrl: 'documentation.html'
})
export class DocumentationPage {
  linkParam: string;
  url: SafeUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.navCtrl = navCtrl;
    this.linkParam = navParams.get('linkParam');
    this.url = this.cleanURL(this.linkParam);
  }

  cleanURL(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}