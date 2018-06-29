import { PushRegistration } from "@aerogear/push";
import { ErrorHandler, Injector, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { Dialogs } from "@ionic-native/dialogs";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { MaterialIconsModule } from "ionic2-material-icons";

import { MyApp } from "./app.component";

import { AuthPage } from "../pages/auth/auth";
import { AuthDetailsPage } from "../pages/authDetails/authDetails";
import { CertPinningPage } from "../pages/certPinning/certPinning";
import { DeviceProfilePage } from "../pages/deviceProfile/deviceProfile";
import { DeviceRegistrationPage } from "../pages/deviceRegistration/deviceRegistration";
import { DeviceSecurityPage } from "../pages/deviceSecurity/deviceSecurity";
import { DeviceTrustPage } from "../pages/deviceTrust/deviceTrust";
import { DocumentationPage } from "../pages/documentation/documentation";
import { HomePage } from "../pages/home/home";
import { IdentityManagementPage } from "../pages/identityManagement/identityManagement";
import { MetricsPage } from "../pages/metrics/metrics";
import { PushPage } from "../pages/push/push";
import { PushMessagesPage } from "../pages/pushMessages/pushMessages";
import { SSOPage } from "../pages/sso/sso";
import { StoragePage } from "../pages/storage/storage";
import { TrustCheckPage } from "../pages/trustCheck/trustCheck";
import { ConstructionPage } from "../pages/underConstruction/construction";

import { SecureStorage } from "@ionic-native/secure-storage";
import { authProvider } from "../services/auth.service";
import { DocumentationService } from "../services/documentation.service";
import { PushService } from "../services/push.service";
import { SimpleToastService } from "../services/toast.service";

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
    ConstructionPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MaterialIconsModule,
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
    ConstructionPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    authProvider,
    SimpleToastService,
    PushService,
    SecureStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PushRegistration,
    Dialogs,
    DocumentationService,
  ],
})
export class AppModule {
  // Make the injector to be available in the entire module
  // so we can use it in the custom decorator
  public static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }}
