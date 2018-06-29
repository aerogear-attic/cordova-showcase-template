import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Dialogs } from '@ionic-native/dialogs';

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
import { PushRegistration } from '@aerogear/push';
import { PushService } from './../services/push.service';
import { DocumentationService } from '../services/documentation.service';

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
    private push: PushRegistration,
    private dialogs: Dialogs,
    private docService: DocumentationService,
    private pushService: PushService  
  ) {
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

  /**
   * A navigate function, that performs pre flight checks on pages that require a configured service
   * If a service has no config a dialog is shown giving the user the options to return to previous page 
   * or view that particular service docs
   * @param page 
   */
  openPage(page) {

    this.menuCtrl.close().then(() => {
      if (page.component === PushMessagesPage){
        // checking for push config
        if (!this.push.hasConfig()){
          this.dialogs.confirm(
            'The service push does not have a configuration in mobile-services.json. ' + 
            'Refer to the documentation for instructions on how to configure this service. ',
            'Feature Not Configured',
            ['Show Documentation', 'Close']  
          ).then((result) => {
            if (result === 1) {
              this.docService.open(DocumentationService.URL_PUSH);
            }
          });
          return;
        }
        // checking if push is registered
        if (this.pushService.getError()) {
          this.dialogs.confirm(
            `The push service failed to register. \n\n ` + 
            `Details: ${ this.pushService.getError().message }`,
            'Push Not Registered',
            ['Close']  
          );
          return;
        }
      }
     
      // check for auth page config
      if (page.component === AuthPage && !this.auth.hasConfig()) {
        this.dialogs.confirm(
          'The service identity management does not have a configuration in mobile-services.json. ' + 
          'Refer to the documentation for instructions on how to configure this service. ',
          'Feature Not Configured',
          ['Show Documentation', 'Close']
        ).then((result) => {
          if (result === 1) {
            this.docService.open(DocumentationService.URL_IDM);
          }
        });
        return;
      }

      this.nav.setRoot(page.component, { 'linkParam': page.param });
      this.currentPage = page;
    })
  }
}