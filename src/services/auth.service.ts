import { AuthService } from '@aerogear/auth';
import { config } from "./config";

var keycloakConfig = config.getKeycloakConfig()

var internalConfig
if (!keycloakConfig) {
  console.error("Keycloak configuration is missing. Authentication will not work properly.");
  internalConfig = {};
}else{
  internalConfig = keycloakConfig.config;
}

export let INSTANCE = new AuthService(internalConfig);

export let keycloakFactory = () => {
  return INSTANCE
};

export let authProvider = {
  provide: AuthService,
  useFactory: keycloakFactory,
  deps: []
}



