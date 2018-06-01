import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { authProvider } from '../../services/auth.service';
import {PushService} from "../../services/push.service";
import {PushNotification} from "../push/notification";
import {PushPage} from "../push/push";
import { Auth } from '@aerogear/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [authProvider]
})
export class HomePage {
  constructor(private navCtrl: NavController, push: PushService, plt: Platform, public auth: Auth) {
    plt.ready().then(() => {
      push.initPush();
      push.setCallback((n) => this.addNotification(n));
      push.register();
    });
  }

  addNotification(noticication: PushNotification) {
    const currentPage = this.navCtrl.getActive(true).name;
    PushPage.addNotification(noticication);

    // Navigate to push page only if we aren't already there
    if (PushPage.name !== currentPage) {
      this.navCtrl.push(PushPage);
    }
  }
}
