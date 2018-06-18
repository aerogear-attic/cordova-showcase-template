import { Dialogs } from '@ionic-native/dialogs';
import {Injectable} from "@angular/core";
import { constants } from '../constants/constants';

declare var navigator: any;
@Injectable()
export class AlertService {

    constructor(private dialogs: Dialogs) {

    }

    showAlert(message: string, title: string, buttonLabels: string[], action: string, url?: string): void {
        this.dialogs.confirm(
            message,
            title,
            buttonLabels)
            .then((result) => {
                if (result === 1) {
                    if (action === constants.exitApp) {
                        navigator.app.exitApp();
                    } else if (action === constants.showDocs) {
                        window.open(url, '_system');
                    }
                }
            });
    }
}