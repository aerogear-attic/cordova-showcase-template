import { SecurityCheckResult, SecurityCheckType, SecurityService } from "@aerogear/security";
import { Component } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs";
import { NavController } from "ionic-angular";

declare var navigator: any;
@Component({
  selector: "page-deviceTrust",
  templateUrl: "deviceTrust.html",
})
export class DeviceTrustPage {
  public detections: Array<{ label: string, detected: boolean }>;
  public trustScore: number;
  public totalTests: number;
  public totalDetections: number;
  public totalPassed: number;
  public icon: string;
  public color: string;
  public securityService: SecurityService;

  constructor(public navCtrl: NavController, private dialog: Dialogs) {
    this.securityService = new SecurityService();
  }

  public performChecks(): Promise<any> {
    return Promise.all([
      this.detectDeviceLock(),
      this.detectRoot(),
      this.detectEmulator(),
      this.detectDebug()]);
  }

  public performChecksAndPublishMetrics(): Promise<SecurityCheckResult[]> {
    return this.securityService.checkManyAndPublishMetric(SecurityCheckType.notDebugMode,
      SecurityCheckType.notRooted,
      SecurityCheckType.notEmulated,
      SecurityCheckType.hasDeviceLock);
  }

  public addDetection(label: string, isSecure: boolean) {
    this.totalTests++;

    if (!isSecure) {
      this.totalDetections++;
    }

    if (isSecure) { this.totalPassed++; }

    this.detections.push({ label, detected: isSecure });
    this.trustScore = Number((100 - (((this.totalDetections / this.totalTests) * 100))).toFixed());
  }

  // Detect if the device is running on an emulator.
  public detectEmulator(): Promise<any> {
    return this.securityService.check(SecurityCheckType.notEmulated)
      .then((isEmulated: SecurityCheckResult) => {
        const emulatedMsg = isEmulated.passed ? "No Emulator Access Detected" : "Emulator Access Detected";
        this.addDetection(emulatedMsg, isEmulated.passed);
      }).catch((err: Error) => console.error(err));
  }

  // Detect if the device is running Root.
  public detectRoot(): Promise<any> {
    return this.securityService.check(SecurityCheckType.notRooted)
      .then((isRooted: SecurityCheckResult) => {
        const rootedMsg = isRooted.passed ? "No Root Access Detected" : "Root Access Detected";
        this.addDetection(rootedMsg, isRooted.passed);
      }).catch((err: Error) => console.error(err));
  }

  // Detect if the app is running in debug mode.
  public detectDebug(): Promise<any> {
    return this.securityService.check(SecurityCheckType.notDebugMode)
      .then((isDebugger: SecurityCheckResult) => {
        const debuggerMsg = isDebugger.passed ? "No Debugger Detected" : "Debugger Detected";
        this.addDetection(debuggerMsg, isDebugger.passed);
      }).catch((err: Error) => console.error(err));
  }

  // Detect if a system device lock is set.
  public detectDeviceLock(): Promise<any> {
    return this.securityService.check(SecurityCheckType.hasDeviceLock)
      .then((deviceLockEnabled: SecurityCheckResult) => {
        const deviceLockMsg = deviceLockEnabled.passed ? "Device Lock Enabled " : "No Device Lock Enabled";
        this.addDetection(deviceLockMsg, deviceLockEnabled.passed);
      });
  }

  public refreshChecks(): void {
    this.ionViewWillEnter();
  }

  public checkDialog(trustScore: number): void {
    if (trustScore < 70) {
      this.dialog.confirm(
        `Your current trust score ${trustScore}% is below the specified target of 70%,` +
        ` do you want to continue or exit the app?`,
        "Warning",
        ["Exit", "Continue"],
      ).then((result) => {
        if (result === 1) {
          navigator.app.exitApp();
        }
      });
    }
  }

  public ionViewWillEnter(): void {
    this.detections = [];
    this.trustScore = 0;
    this.totalTests = 0;
    this.totalDetections = 0;
    this.totalPassed = 0;
    this.performChecks().then(() => {
      this.checkDialog(this.trustScore);
    });
    this.performChecksAndPublishMetrics();
  }

}
