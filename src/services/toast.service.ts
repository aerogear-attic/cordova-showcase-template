import { ToastController } from 'ionic-angular';
import {Injectable} from "@angular/core";

/**
 * Wrapst the ionic ToastController and provider a simplified interface to trigger
 * success and error messages
 */
@Injectable()
export class SimpleToastService {
  constructor(public toastCtrl: ToastController) {
  }

  showSuccess(msg: string, position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: position,
      cssClass: 'toast-success'
    }).present();
  }

  showError(msg: string, position: string = 'top') {
    this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: position,
      cssClass: 'toast-error'
    }).present();
  }
}
