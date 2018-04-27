import { Component } from '@angular/core';
import { ConfigurationHelper } from '@aerogear/core';
import { AuthService } from '@aerogear/auth';
import { authProvider } from '../../../services/auth.service';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';

import {RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
declare var require: any
var config = require('../../../mobile-services.json');
declare let window: any;

@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
  providers: [authProvider]
})
export class NetworkPage {
  apiAccessRole: string;
  progress: number;
  headerConfig: object;
  apiServerUrl: string;
  apiEndpoint: string;
  pinningSuccess: boolean;
  responseRecieved: boolean;
  requestSuccess: boolean;
  requestFailure: boolean;
  configuration: any;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, private auth: AuthService, public navCtrl: NavController, public http: Http) {
    this.configuration = new ConfigurationHelper(config).getConfig(AuthService.ID);
    this.auth = auth;
    this.toastCtrl = toastCtrl;
    this.loadingCtrl = loadingCtrl;
    this.navCtrl = navCtrl;
    this.http = http;
    this.apiAccessRole = "api-access";
    this.headerConfig = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.auth.extract().token
    };
    this.apiServerUrl = this.configuration.config.apiServerUrl;
    this.apiEndpoint = this.configuration.config.apiEndpoint;
    this.pinningSuccess = false;
    this.responseRecieved = false;
    this.requestFailure = false;   
  }
  
  sendRequest() {
    let loader = this.loadingCtrl.create({
      content: "Checking Connection.."
    });
    loader.present();

    let headers = new Headers(this.headerConfig);
    let options = new RequestOptions({headers});

    var server = this.apiServerUrl;
    var fingerprint = this.configuration.config.pinningFingerprint;
    
    window.plugins.sslCertificateChecker.check(
            function() {
                loader.dismiss();
                this.pinningSuccess = true;
                this.responseRecieved = true;
                this.http.get(this.apiServerUrl + this.apiEndpoint, options).subscribe(res => {
                  console.log(res.status);
                  if(res.status === 200) {
                    this.requestSuccess = true;
                  } else {
                    this.requestFailure = true;
                  }
                }, err => {
                  this.requestFailure = true
                });
            }.bind(this),
            function(message) {
              loader.dismiss();
              if (message == "CONNECTION_NOT_SECURE") {
                let toast = this.toastCtrl.create({
                   message: 'Connection Not Secure.',
                   duration: 10000,
                   position: 'bottom'
                 });

                toast.present();
              }
            }.bind(this),
            server,
            fingerprint
          );
          }
  }
