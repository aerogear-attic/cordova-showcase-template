import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthService } from '@aerogear/auth';
import { ConfigurationParser } from '@aerogear/core';
import { config } from "./config";
import { AppModule } from '../app/app.module';

declare var require: any

let keycloakConfig = config.getConfig("keycloak")
export let INSTANCE = new AuthService(keycloakConfig);

if (!keycloakConfig) {
  console.error("Keycloak configuration is missing. Authentication will not work properly.");
} else {
  // tag::appInit[]
  // Ensure that Keycloak is Initialised before Angular to prevent Redirect looping issues
  INSTANCE.init(keycloakConfig.config)
  .then(() => {
    const platform = platformBrowserDynamic();
    // Mamually intiliase angular
    platform.bootstrapModule(AppModule);
  })
  .catch((err) => {
    console.error("Error Initalizing Keycloak", err)
  });
  // end::appInit[]
}

export let keycloakFactory = () => {
  console.log("keycloakFactory is called");
  return INSTANCE
};

export let keycloakProvider = {
  provide: AuthService,
  useFactory: keycloakFactory,
  deps: []
}
