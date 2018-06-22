import { PushRegistration } from '@aerogear/push';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { DeviceTrustPage } from '../pages/deviceTrust/deviceTrust';
import { AuthDetailsPage } from '../pages/authDetails/authDetails';
import { StoragePage } from '../pages/storage/storage';
import { CertPinningPage } from '../pages/certPinning/certPinning';
import { DeviceProfilePage } from '../pages/deviceProfile/deviceProfile';
import { DeviceRegistrationPage } from '../pages/deviceRegistration/deviceRegistration';
import { MetricsPage } from '../pages/metrics/metrics';
import { SSOPage } from '../pages/sso/sso';
import { PushMessagesPage } from '../pages/pushMessages/pushMessages';
import { TrustCheckPage } from '../pages/trustCheck/trustCheck';
import { DocumentationPage } from '../pages/documentation/documentation';

import { authProvider } from '../services/auth.service';
import { SecureStorage } from '@ionic-native/secure-storage';

import { AlertService } from '../services/alert.service';
import {PushPage} from "../pages/push/push";
import {PushService} from "../services/push.service";
import {SimpleToastService} from "../services/toast.service";

import { MaterialIconsModule } from 'ionic2-material-icons';
import { Dialogs } from '@ionic-native/dialogs';
import { IdentityManagementPage } from '../pages/identityManagement/identityManagement';
import { DeviceSecurityPage } from '../pages/deviceSecurity/deviceSecurity';
import { ConstructionPage } from '../pages/underConstruction/construction';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    PushPage,
    AuthDetailsPage,
    DeviceTrustPage,
    StoragePage,
    CertPinningPage,
    DeviceProfilePage,
    DeviceRegistrationPage,
    MetricsPage,
    SSOPage,
    PushMessagesPage,
    TrustCheckPage,
    IdentityManagementPage,
    DeviceSecurityPage,
    DocumentationPage,
    ConstructionPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MaterialIconsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    PushPage,
    AuthDetailsPage,
    DeviceTrustPage,
    StoragePage,
    CertPinningPage,
    DeviceProfilePage,
    DeviceRegistrationPage,
    MetricsPage,
    SSOPage,
    PushMessagesPage,
    TrustCheckPage,
    IdentityManagementPage,
    DeviceSecurityPage,
    DocumentationPage,
    ConstructionPage
  ],
  providers: [
    AlertService,
    StatusBar,
    SplashScreen,
    authProvider,
    SimpleToastService,
    PushService,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PushRegistration,
    Dialogs
  ]
})
export class AppModule {
  // Make the injector to be available in the entire module
  // so we can use it in the custom decorator
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }}
