import { Auth } from "@aerogear/auth";
import { ServiceConfiguration } from "@aerogear/core";
import { Component } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs";
import { HTTP } from "@ionic-native/http";
import { NavController, Platform } from "ionic-angular";
import { authProvider } from "../../services/auth.service";
import { DocumentationService } from "../../services/documentation.service";
import { PushService } from "../../services/push.service";
import { PushMessage } from "../pushMessages/message";
import { PushMessagesPage } from "../pushMessages/pushMessages";

declare var url: any;
declare var require: any;
// tslint:disable-next-line:no-var-requires
const appConfig = require("../../mobile-services.json");

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [authProvider],
})
export class HomePage {

  private configuration: ServiceConfiguration = appConfig.services[0];

  constructor(
    private navCtrl: NavController,
    push: PushService,
    plt: Platform,
    public auth: Auth,
    public docService: DocumentationService,
    public dialog: Dialogs,
    public http: HTTP) {
    this.checkSSL();
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

  public checkSSL() {
    if (appConfig.services.length > 0) {
      this.http.get(this.configuration.url, {}, {})
        .then(() => {
          console.info("SSL handshake successfull");
        }).catch((error) => {
          if (error.status === -1) {
            this.dialog.confirm(
              `You may be using self signed certificates that will prevent the showcase from running properly.` +
              ` Please review the documentation and configure your certificates.`,
              "Certificate Error",
              ["Show Documentation", "Close"],
            ).then((result) => {
              if (result === 1) {
                this.docService.open(DocumentationService.SELF_SIGNED_DOCS);
              }
            });
          }
        });
    }
  }
}
