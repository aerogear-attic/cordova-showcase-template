import { INSTANCE } from "../services/auth.service"
import { initMetrics } from "../services/metrics"

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../app/app.module';

const platform = platformBrowserDynamic();
// Init angular
platform.bootstrapModule(AppModule).then(()=>{
  initMetrics();
  return AppModule;
});

if(window['cordova']){
  document.addEventListener("deviceready", initAuth, false);
} else {
  // Init for the web
  initAuth();
}

/**
 * Initializes Auth auth and creates main angular context
 * This will reload angular context again
 */
 function initAuth() {
  // Ensure that Auth is init before Angular to prevent Redirect looping issues
  INSTANCE.init({})
}
