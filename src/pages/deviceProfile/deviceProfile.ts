import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-deviceProfile",
  templateUrl: "deviceProfile.html",
})
export class DeviceProfilePage {
  public pageTitle: string;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
    this.pageTitle = navParams.get("linkParam");
  }
}
