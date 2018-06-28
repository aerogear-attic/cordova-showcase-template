import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { authProvider } from '../../services/auth.service';
import {PushService} from "../../services/push.service";
import {PushMessagesPage} from "../pushMessages/pushMessages";
import { Auth } from '@aerogear/auth';
import { PushMessage } from '../pushMessages/message';
import { DocumentationPage } from '../documentation/documentation';

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

  openLink(){
    console.log("woop")
    this.navCtrl.setRoot(DocumentationPage, { 'linkParam': "https://www.aerogear.org/" });
  }

  addNotification(notification: PushMessage) {
    console.debug(`Received push notification: ${notification.message}`);
    // Navigate to push page
    this.navCtrl.push(PushMessagesPage);
  }
}