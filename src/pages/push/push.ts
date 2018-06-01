import { Component } from '@angular/core';
import { PushNotification } from "./notification";
import {PushService} from "../../services/push.service";

@Component({
  selector: 'page-push',
  templateUrl: 'push.html'
})
export class PushPage {
  public static notifications: PushNotification[] = [];

  constructor(private push: PushService) {
  }

  disablePush() {
    this.push.unregister();
  }

  getNotifications() {
    return PushPage.notifications;
  }

  public static addNotification(notification: PushNotification) {
    PushPage.notifications.push(notification);
  }

  public buttonVisible(): boolean {
    return PushService.registered;
  }
}