import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DocumentationService } from '../../services/documentation.service';


@Component({
    selector: 'page-construction',
    templateUrl: 'construction.html'
})

export class ConstructionPage {
    pageTitle: string;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public docService: DocumentationService) {
        this.navCtrl = navCtrl;
        this.pageTitle = navParams.get('linkParam');
    }

    openLink(){
        this.docService.open(DocumentationService.URL_GUIDES);
      }
    
    
    ionViewDidEnter(): void {}
}
