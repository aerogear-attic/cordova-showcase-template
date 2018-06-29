import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-trustCheck",
  templateUrl: "trustCheck.html",
})

export class TrustCheckPage {
  public pageTitle: string;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.pageTitle = navParams.get("linkParam");
  }
}
