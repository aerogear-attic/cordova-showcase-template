import { Component } from '@angular/core';
import { PushMessage } from "./message";
import { PushService } from "../../services/push.service";
import { Refresher } from "ionic-angular";

@Component({
  selector: 'page-pushMessages',
  templateUrl: 'pushMessages.html'
})
export class PushMessagesPage {
  public messages: PushMessage[] = null;

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