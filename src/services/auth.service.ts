declare var require: any
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AuthService } from '@aerogear/auth';

var keycloakConfig = require('../config/keycloak.json');


export let INSTANCE = new AuthService(keycloakConfig);


export let keycloakFactory = () => {
    console.log("keycloakFactory is called");
    return INSTANCE
};

export let keycloakProvider = {
    provide: AuthService,
    useFactory: keycloakFactory,
    deps: []
} 
