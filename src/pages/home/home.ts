import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { authProvider } from '../../services/auth.service';
import {PushService} from "../../services/push.service";
import {PushMessagesPage} from "../pushMessages/pushMessages";
import { Auth } from '@aerogear/auth';
import { PushMessage } from '../pushMessages/message';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [authProvider]
})
export class HomePage {
  constructor(private navCtrl: NavController, push: PushService, plt: Platform, public auth: Auth) {
    // We need to wait for the platform to initialize the plugins
    plt.ready().then(() => {
      push.initPush();
      push.setCallback((n) => this.addNotification(n));
      push.register();
    });
  }

  addNotification(notification: PushMessage) {
    console.debug(`Received push notification: ${notification.message}`);
    const currentPage = this.navCtrl.getActive(true).name;

    // Navigate to push page only if we aren't already there
    if (PushMessagesPage.name !== currentPage) {
      this.navCtrl.push(PushMessagesPage);
    }
  }
}
