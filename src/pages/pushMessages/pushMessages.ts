import { Component } from '@angular/core';
import { PushMessage } from "./message";
import { PushService } from "../../services/push.service";

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
}