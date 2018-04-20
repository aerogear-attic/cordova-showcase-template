import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { INSTANCE as keycloakInstance } from '../services/auth.service';
declare var require: any
var keycloakConfig = require('../config/keycloak.json');



// tag::appInit[]
// Ensure that Keycloak is Initialised before Angular to prevent Redirect looping issues
keycloakInstance.init(keycloakConfig)
    .then(() => {
        const platform = platformBrowserDynamic();
        // Mamually intiliase angular
        platform.bootstrapModule(AppModule);
    })
    .catch((err) => {
        console.error("Error Initalizing Keycloak", err)
    });
// end::appInit[]
