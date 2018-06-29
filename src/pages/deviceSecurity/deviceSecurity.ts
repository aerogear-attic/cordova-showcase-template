import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-deviceSecurity",
  templateUrl: "deviceSecurity.html",
})
export class DeviceSecurityPage {

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl = navCtrl;
  }
}
