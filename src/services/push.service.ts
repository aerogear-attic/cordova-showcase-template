import {Push, PushObject} from "@ionic-native/push";
import {Injectable} from "@angular/core";
import {SimpleToastService} from "./toast.service";
import { PushRegistration } from "@aerogear/push";
import {PushNotification} from "../pages/push/notification";

const PUSH_ALIAS = "cordova";

/**
 * Handles interactions with the push plugin and provides an easy interface
 * to register and unregister from push notifications
 */
@Injectable()
export class PushService {
  public static registered: boolean = false;

  // We want one single instance & callback app wide
  static pushObject: PushObject = null;
  static callback: (notification: PushNotification) => void;

  constructor(private toast: SimpleToastService) {
  }

  public initPush() {
    PushService.pushObject = new Push().init({
        android: {},
        ios: {
          alert: true,
          badge: true,
          sound: true
        }
    });
  }

  private emit(notification: PushNotification) {
    if (PushService.callback) {
      PushService.callback(notification);
    }
  }

  // The callback will be triggered when a push notificatoin is received
  public setCallback(cb: (notification: PushNotification) => void) {
    PushService.callback = cb;
  }

  // No longer receive notifications
  public unregister() {
    PushService.pushObject.unregister().then(() => {
      PushService.registered = false;

      this.toast.showSuccess("Successfully unregistered");
    }).catch(() => {
      this.toast.showError("Error unregistering");
    });
  }

  public register() {
    PushService.pushObject.on('error').subscribe(err => {
      console.error(`Error configuring push notifications: ${err.message}`);
    });

    // Invokes the UPS registration endpoint
    PushService.pushObject.on('registration').subscribe(data => {
      new PushRegistration().register(data.registrationId, PUSH_ALIAS).then(() => {
        PushService.registered = true;
        this.toast.showSuccess("Device successfully registered for push");
      }).catch(err => {
        this.toast.showError("Error registering device for push");
      });
    });

    PushService.pushObject.on('notification').subscribe(notification => {
      const newNotification = {
        message: notification.message,
        received: new Date().toDateString()
      };

      this.emit(newNotification);
    });
  }
}