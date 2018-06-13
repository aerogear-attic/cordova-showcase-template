import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { DeviceTrustPage } from '../pages/deviceTrust/deviceTrust';
import { StoragePage } from '../pages/storage/storage';
import { PushPage } from "../pages/push/push";
import { AuthDetailsPage } from '../pages/authDetails/authDetails';
import { CertPinningPage } from '../pages/certPinning/certPinning';
import { DeviceProfilePage } from '../pages/deviceProfile/deviceProfile';
import { DeviceRegistrationPage } from '../pages/deviceRegistration/deviceRegistration';
import { MetricsPage } from '../pages/metrics/metrics';
import { SSOPage } from '../pages/sso/sso';
import { PushMessagesPage } from '../pages/pushMessages/pushMessages';
import { TrustCheckPage } from '../pages/trustCheck/trustCheck';
import { DocumentationPage } from '../pages/documentation/documentation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public pages: Array<{ title: string, component: any, icon: string }>;

  rootPage: any = HomePage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    this.initializeApp();

  }

  initializeOptions(): void {
    this.pages = []; 
    // used for an example of ngFor and navigation
    this.pages.push(
      { title: 'Home', component: HomePage, icon: 'home' },
      
      { title: 'Identity Management', component: AuthDetailsPage, icon: 'account_circle' },
      { title: 'Documentation', component: DocumentationPage, icon: '' },
      { title: 'Authentication', component: AuthPage, icon: '' },
      { title: 'SSO', component: SSOPage, icon: '' },
      
      { title: 'Device Security', component: DeviceTrustPage, icon: 'security' },
      { title: 'Documentation', component: DocumentationPage, icon: '' },
      { title: 'Device Trust', component: DeviceTrustPage, icon: '' },
      { title: 'Secure Storage', component: StoragePage, icon: '' },
      { title: 'Cert Pinning', component: CertPinningPage, icon: '' },
      
      { title: 'Push Notifications', component: PushPage, icon: 'notifications_active' },
      { title: 'Documentation', component: DocumentationPage, icon: '' },
      { title: 'Device Registration', component: DeviceRegistrationPage, icon: '' },
      { title: 'Push Messages', component: PushMessagesPage, icon: '' },

      { title: 'Metrics', component: MetricsPage, icon: 'insert_chart' },
      { title: 'Documentation', component: DocumentationPage, icon: '' },
      { title: 'Device Profile Info', component: DeviceProfilePage, icon: '' },
      { title: 'Trust Check Info', component: TrustCheckPage, icon: '' }
      
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.initializeOptions();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close().then(() => {
      this.nav.setRoot(page.component);
    })
  }
}

