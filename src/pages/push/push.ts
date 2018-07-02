import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-push",
  templateUrl: "push.html",
})
export class PushPage {

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
  }
}
