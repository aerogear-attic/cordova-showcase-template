import { Component } from '@angular/core';
import { PushNotification } from "./notification";
import { PushService } from "../../services/push.service";
import { Refresher } from "ionic-angular";

@Component({
  selector: 'page-push',
  templateUrl: 'push.html'
})
export class PushPage {
  public messages: PushNotification[] = null;

  constructor(private push: PushService) {
    this.messages = push.messages;
  }

  disablePush() {
    this.push.unregister();
  }

  doRefresh(refresher: Refresher) {
    this.messages = this.push.messages;
    refresher.complete();
  }

  buttonVisible() {
    return PushService.registered;
  }
}