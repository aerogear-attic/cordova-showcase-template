import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { StorageService } from '../../../services/storage.service';
import { AlertController } from 'ionic-angular';
import { SecurityService, SecurityCheckType, SecurityCheckResult } from '@aerogear/security';

@Component({
  selector: 'page-storage',
  templateUrl: 'storage.html',
  providers: [StorageService]
})
export class StoragePage {
  notes: any;
  securityService: SecurityService;

  constructor(private storageService: StorageService, public navCtrl: NavController, public alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.storageService = storageService
    this.alertCtrl = alertCtrl;
    this.notes = [];
    this.securityService = new SecurityService();
    }

  listNotes() {
    this.storageService.getNotes().then((notes) => {
      this.notes = notes;
    })
    .catch((err) => console.error("Error retrieving notes", err));
  }

  createNote(title: string, content: string) {
    this.storageService.createNote(title, content).then((notes) => {
      this.listNotes();
    });
  }

  deviceLockCheck() {
    this.securityService.check(SecurityCheckType.hasDeviceLock)
    .then((deviceLockEnabled: SecurityCheckResult) => {
      if (!deviceLockEnabled.passed) {
        this.deviceLockToast();
      }else{
        this.showCreateModal();
      }
    });
  }

  deviceLockToast(){
    this.toastCtrl.create({
      message: "No Device Lock Detected. Enable to use Storage",
      duration: 3000,
    }).present();
  }

  showCreateModal() {
    let alert = this.alertCtrl.create({
      title: 'Create Secure Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'content',
          placeholder: 'Content'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            if (data.title) {
              this.createNote(data.title, data.content)
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  readNote(note: any) {
  let alert = this.alertCtrl.create({
      title: note.title,
      subTitle: note.content,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  ionViewDidEnter(): void {
    this.listNotes();
  }

}
