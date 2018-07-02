import { Component } from "@angular/core";
import { PushService } from "../../services/push.service";
import { PushMessage } from "./message";

@Component({
  selector: "page-pushMessages",
  templateUrl: "pushMessages.html",
})
export class PushMessagesPage {
  public messages: PushMessage[] = null;

  constructor(private push: PushService) {
    this.messages = push.messages;
  }

  public disablePush() {
    this.push.unregister();
  }
}
