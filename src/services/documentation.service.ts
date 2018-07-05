import { Injectable } from "@angular/core";
import { App } from "ionic-angular";
import { DocumentationPage } from "../pages/documentation/documentation";

@Injectable()
export class DocumentationService {
  public static readonly URL_GUIDES: string = "https://aerogear.org/community/#guides";
  public static readonly URL_HOMEPAGE: string = "https://aerogear.org/";
  public static readonly URL_IDM: string = "https://docs.aerogear.org/external/showcase/cordova/idm.html";
  public static readonly URL_METRICS: string = "https://docs.aerogear.org/external/showcase/cordova/metrics.html";
  public static readonly URL_PUSH: string = "https://docs.aerogear.org/external/showcase/cordova/push.html";
  public static readonly URL_DEVICE_SECURITY: string = "https://docs.aerogear.org/external/showcase/cordova/security.html";
  public static readonly SELF_SIGNED_DOCS: string = "https://docs.aerogear.org/external/cert/self-signed-cert.html";
  
  constructor(private app: App) {
  }

  public open(url: string) {
    const nav = this.app.getActiveNav();
    nav.setRoot(DocumentationPage, { linkParam: url });
  }

}
