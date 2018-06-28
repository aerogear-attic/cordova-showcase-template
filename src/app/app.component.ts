import { AlertService } from './../services/alert.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { DeviceTrustPage } from '../pages/deviceTrust/deviceTrust';
import { StoragePage } from '../pages/storage/storage';
import { PushPage } from "../pages/push/push";
import { IdentityManagementPage } from '../pages/identityManagement/identityManagement';
import { CertPinningPage } from '../pages/certPinning/certPinning';
import { DeviceProfilePage } from '../pages/deviceProfile/deviceProfile';
import { MetricsPage } from '../pages/metrics/metrics';
import { SSOPage } from '../pages/sso/sso';
import { PushMessagesPage } from '../pages/pushMessages/pushMessages';
import { TrustCheckPage } from '../pages/trustCheck/trustCheck';
import { DocumentationPage } from '../pages/documentation/documentation';
import { DeviceSecurityPage } from '../pages/deviceSecurity/deviceSecurity';
import { Auth } from '@aerogear/auth';
import { constants } from '../constants/constants';
import { PushRegistration } from '@aerogear/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public pages: Array<{ id: string, title: string, component: any, icon: string, param: string }>;

  rootPage: any = HomePage;
  currentPage: any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private auth: Auth,
    private alert: AlertService,
    private push: PushRegistration) {
    this.initializeApp();
  }

  initializeOptions(): void {
    this.pages = [];
    // used for an example of ngFor and navigation
    this.pages.push(
      { id: 'home', title: 'Home', component: HomePage, icon: 'home', param: 'Home' },

      { id: 'idm', title: 'Identity Management', component: IdentityManagementPage, icon: 'account_circle', param: 'Identity Management' },
      { id: 'idm-docs', title: 'Documentation', component: DocumentationPage, icon: null, param: 'identity-management' },
      { id: 'idm-auth', title: 'Authentication', component: AuthPage, icon: null, param: 'Authentication' },
      { id: 'idm-sso', title: 'SSO', component: SSOPage, icon: null, param: 'SSO' },

      { id: 'security', title: 'Device Security', component: DeviceSecurityPage, icon: 'security', param: 'Device Security' },
      { id: 'security-docs', title: 'Documentation', component: DocumentationPage, icon: null, param: 'device-security' },
      { id: 'security-trust', title: 'Device Trust', component: DeviceTrustPage, icon: null, param: 'Device Trust' },
      { id: 'security-storage', title: 'Secure Storage', component: StoragePage, icon: null, param: 'Secure Storage' },
      { id: 'security-pinning', title: 'Cert Pinning', component: CertPinningPage, icon: null, param: 'Cert Pinning' },

      { id: 'push', title: 'Push Notifications', component: PushPage, icon: 'notifications_active', param: 'Push Notifications' },
      { id: 'push-docs', title: 'Documentation', component: DocumentationPage, icon: null, param: 'push' },
      { id: 'push-messages', title: 'Push Messages', component: PushMessagesPage, icon: null, param: 'Push Messages' },

      { id: 'metrics', title: 'Metrics', component: MetricsPage, icon: 'insert_chart', param: 'Metrics' },
      { id: 'metrics-docs', title: 'Documentation', component: DocumentationPage, icon: null, param: 'metrics' },
      { id: 'metrics-profile', title: 'Device Profile Info', component: DeviceProfilePage, icon: null, param: 'Device Profile Info' },
      { id: 'metrics-trust', title: 'Trust Check Info', component: TrustCheckPage, icon: null, param: 'Trust Check Info' }

    );
    this.currentPage = this.pages[0];
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

  isCurrentPage(page) {
    return page.id === this.currentPage.id;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close().then(() => {
      if (page.component === PushMessagesPage && !this.push.hasConfig()) {
        this.alert.showAlert(constants.pushAlertMessage, constants.featureNotConfigured,
          constants.alertButtons, constants.showDocs, constants.pushDocsUrl);
        return;
      }

      if (page.component === AuthPage && !this.auth.hasConfig()) {
        this.alert.showAlert(constants.idmMessage, constants.featureNotConfigured,
          constants.alertButtons, constants.showDocs, constants.idmUrl);
        return;
      }
      this.nav.setRoot(page.component, { 'linkParam': page.param });
      this.currentPage = page;
    })
  }
}

