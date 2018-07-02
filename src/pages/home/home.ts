import { Auth } from "@aerogear/auth";
import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { authProvider } from "../../services/auth.service";
import { DocumentationService } from "../../services/documentation.service";
import { PushService } from "../../services/push.service";
import { PushMessage } from "../pushMessages/message";
import { PushMessagesPage } from "../pushMessages/pushMessages";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [authProvider],
})
export class HomePage {
  constructor(
    private navCtrl: NavController,
    push: PushService,
    plt: Platform,
    public auth: Auth,
    public docService: DocumentationService) {
    // We need to wait for the platform to initialize the plugins
    plt.ready().then(() => {
      push.initPush();
      push.setCallback((n) => this.addNotification(n));
      push.register();
    });
  }

  public openLink() {
    this.docService.open(DocumentationService.URL_HOMEPAGE);
  }

  public addNotification(notification: PushMessage) {
    console.debug(`Received push notification: ${notification.message}`);
    // Navigate to push page
    this.navCtrl.push(PushMessagesPage);
  }
}
