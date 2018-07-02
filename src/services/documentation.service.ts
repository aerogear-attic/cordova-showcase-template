import { Injectable } from "@angular/core";
import { App } from "ionic-angular";
import { DocumentationPage } from "../pages/documentation/documentation";

@Injectable()
export class DocumentationService {
  public static readonly URL_GUIDES: string = "https://aerogear.org/community/#guides";
  public static readonly URL_HOMEPAGE: string = "https://aerogear.org/";
  public static readonly URL_IDM: string = "https://docs.aerogear.org/aerogear/latest/showcase/idm.html#nochrome";
  public static readonly URL_METRICS: string = "https://docs.aerogear.org/aerogear/latest/showcase/metrics.html#nochrome";
  public static readonly URL_PUSH: string = "https://docs.aerogear.org/aerogear/latest/showcase/push.html#nochrome";
  public static readonly URL_DEVICE_SECURITY: string = "https://docs.aerogear.org/aerogear/latest/security/index.html#nochrome";

  constructor(private app: App) {
  }

  public open(url: string) {
    const nav = this.app.getActiveNav();
    nav.setRoot(DocumentationPage, { linkParam: url });
  }

}
