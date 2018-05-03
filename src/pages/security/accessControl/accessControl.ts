import { Component } from '@angular/core';
import { authProvider } from '../../../services/auth.service';
import { AuthService } from '@aerogear/auth';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AuthPage } from '../../auth/auth';

@Component({
  selector: 'page-accessControl',
  templateUrl: 'accessControl.html',
  providers: [authProvider]
})
export class AccessControlPage {
  superuserRole: boolean;
  apiAccessRole: boolean;
  mobileUserRole: boolean;
  offlineAccessRole: boolean;
  uma_auth: boolean;
  allRoles: any;

  constructor(public toastCtrl: ToastController, private auth: AuthService, public navCtrl: NavController) {
    this.auth = auth;
    this.toastCtrl = toastCtrl;
    this.navCtrl = navCtrl;
  }

  ionViewDidEnter(): void {
    if(this.auth.isAuthenticated()) {
    this.auth.loadUserProfile().then((userProfile) => {
        this.superuserRole = this.auth.hasRealmRole('superuser');
        this.mobileUserRole = this.auth.hasRealmRole('mobile-user');
        this.apiAccessRole = this.auth.hasRealmRole('api-access');
        this.offlineAccessRole = this.auth.hasRealmRole('offline_access');
        this.uma_auth = this.auth.hasRealmRole('uma_authorization');
        this.allRoles = this.auth.getRealmRoles;
        console.log(this.allRoles);
        
      })
      .catch((err) => console.error("Error retrieving user profile", err));
    } else {
      let toast = this.toastCtrl.create({
         message: 'Not Authenticated',
         duration: 3000,
         position: 'bottom'
       });

       this.navCtrl.setRoot(AuthPage);
       toast.present();
      }
    }
  }
