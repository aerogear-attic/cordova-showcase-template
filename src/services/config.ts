import { ConfigurationParser } from '@aerogear/core';

declare var require: any

var appConfig = require('../mobile-services.json');

// TODO config part is too verbose.
// We ideally looking for helper method instead of class.
export let config = new ConfigurationParser(appConfig);
