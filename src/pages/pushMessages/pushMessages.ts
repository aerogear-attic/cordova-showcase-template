import { Component } from '@angular/core';
import { PushMessage } from "./message";
import { PushService } from "../../services/push.service";
import { Refresher } from "ionic-angular";
import { constants } from '../../constants/constants';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'page-pushMessages',
  templateUrl: 'pushMessages.html'
})
export class PushMessagesPage {
  public messages: PushMessage[] = null;

  constructor(private push: PushService, private alert: AlertService) {
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

  ionViewDidEnter(): void {
    if (!this.buttonVisible()) {
          this.alert.showAlert(constants.pushAlertMessage, constants.featureNotConfigured, 
            constants.alertButtons, constants.showDocs, constants.pushDocsUrl);

    }
  }
}