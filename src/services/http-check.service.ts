import { ServiceConfiguration } from "@aerogear/core";
import { Injectable } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs";
import { HTTP } from "@ionic-native/http";
import { DocumentationService } from "./documentation.service";

declare var require: any;
// tslint:disable-next-line:no-var-requires
const appConfig = require("../mobile-services.json");

@Injectable()
export class HTTPCheckService {

  private configuration: ServiceConfiguration = appConfig.services[0];

  constructor(public docService: DocumentationService, public dialog: Dialogs, public http: HTTP) {
  }

  public checkSSL() {
    if (appConfig.services.length > 0) {
      this.http.get(this.configuration.url, {}, {})
        .then(() => {
          console.info("SSL handshake successfull");
        }).catch((error) => {
          console.error("ssl", error);
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
