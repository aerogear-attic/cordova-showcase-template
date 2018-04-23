

import { INSTANCE } from "../services/auth.service"
import { initMetrics } from "../services/metrics"

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../app/app.module';


initAuth();

/**
 * Initializes Auth auth and creates main angular context
 * This will reload angular context again
 */
 function initAuth() {
  // Ensure that Auth is init before Angular to prevent Redirect looping issues
  INSTANCE.init({})
    .then(() => {
      const platform = platformBrowserDynamic();
      // Manually init angular
      platform.bootstrapModule(AppModule).then(()=>{
        initMetrics();
      });
    })
    .catch((err) => {
      console.error("Error Initalizing Auth", err)
    });
}
