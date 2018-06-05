import {ChangeDetectorRef, Component} from '@angular/core';
import { PushNotification } from "./notification";
import {PushService} from "../../services/push.service";

@Component({
  selector: 'page-push',
  templateUrl: 'push.html'
})
export class PushPage {
  public static notifications: PushNotification[] = [];

  constructor(private push: PushService, ref: ChangeDetectorRef) {
    setInterval(() => {
      ref.detectChanges();
    }, 2000);
  }

  disablePush() {
    this.push.unregister();
  }

  public static addNotification(notification: PushNotification) {
    PushPage.notifications.push(notification);
  }

  public buttonVisible(): boolean {
    return PushService.registered;
  }

  get messages() {
    return PushPage.notifications;
  }
}