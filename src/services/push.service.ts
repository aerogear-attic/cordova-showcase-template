import {Push, PushObject} from "@ionic-native/push";
import {Injectable} from "@angular/core";
import { PushRegistration } from "@aerogear/push";
import {PushMessage} from "../pages/pushMessages/message";

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
  static callback: (notification: PushMessage) => void;

  public messages: PushMessage[] = [];
  private pushError: Error;

  constructor() {
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

  private emit(notification: PushMessage) {
    if (PushService.callback) {
      PushService.callback(notification);
    }
  }

  // The callback will be triggered when a push notificatoin is received
  public setCallback(cb: (notification: PushMessage) => void) {
    PushService.callback = cb;
  }

  // No longer receive notifications
  public unregister() {
    PushService.pushObject.unregister().then(() => {
      PushService.registered = false;
      console.log("Successfully unregistered");
    }).catch(() => {
      console.log("Error unregistering");
    });
  }

  public register() {
    PushService.pushObject.on('error').subscribe(err => {
      console.error(`Error configuring push notifications ${err.message}`);
      this.pushError = err;
    });

    // Invokes the UPS registration endpoint
    PushService.pushObject.on('registration').subscribe(data => {
      new PushRegistration().register(data.registrationId, PUSH_ALIAS).then(() => {
        PushService.registered = true;
        console.log("Push registration successful");
      }).catch(err => {
        this.pushError = err;
        console.log("Push registration unsuccessful ", this.pushError);
      });
    });

    PushService.pushObject.on('notification').subscribe(notification => {
      const newNotification = {
        message: notification.message,
        received: new Date().toDateString()
      };
      this.messages.push(newNotification);
      this.emit(newNotification);
    });
  }

  public getError() {
    return this.pushError;
  }

  public isRegistered() {
    return PushService.registered;
  }
}