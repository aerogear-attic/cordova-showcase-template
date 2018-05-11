import { Auth } from '@aerogear/auth';
import { init } from '@aerogear/app';
declare var require: any
let appConfig = require("../mobile-services.json");
init(appConfig);

export let INSTANCE = new Auth();

export let keycloakFactory = () => {
  return INSTANCE
};

export let authProvider = {
  provide: Auth,
  useFactory: keycloakFactory,
  deps: []
}



