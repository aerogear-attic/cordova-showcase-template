# Contributing to the Cordova Showcase Application Template

The Cordova Showcase Application Template is part of the [AeroGear project](https://aerogear.org/), see the [Community Page](https://aerogear.org/community) for general guidelines for contributing to the project.

This document details specifics for contributions to the Cordova Showcase Application Template.

## Issue tracker

The tracking of issues for the AeroGear Cordova Showcase Application Template is done in the [AeroGear Android Project](https://issues.jboss.org/projects/AEROGEAR/issues) in the [JBoss Developer JIRA](https://issues.jboss.org).

See the [AeroGear JIRA Usage and Guidelines Guide](https://aerogear.org/docs/guides/JIRAUsage/) for information on how the issue tracker relates to contributions to this project.

## Asking for help

Whether you're contributing a new feature or bug fix, or simply submitting a
ticket, the Aerogear team is available for technical advice or feedback. 
You can reach us at [#aerogear](ircs://chat.freenode.net:6697/aerogear) on [Freenode IRC](https://freenode.net/) or the 
[aerogear google group](https://groups.google.com/forum/#!forum/aerogear)
-- both are actively monitored.

## Prerequisites

Ensure you have the following installed in your machine:

- [Node](https://nodejs.org/en/) - version 8.9.4
- [Ionic](https://ionicframework.com/) - version 3.20.0
- [Cordova](https://cordova.apache.org/) - version 8.0.0


# Developing the Cordova Showcase Application Template for testing new SDK features
Note: Work completed on un released SDK features should never be merged to `master` all experimental work should be merged to `development` branch only.

## Cloning the repository
You will first need to clone [Aerogear Js SDK](https://github.com/aerogear/aerogear-js-sdk):
```
git clone git@github.com:aerogear/aerogear-js-sdk.git
```
Next, clone the showcase app directly into the SDK:
```
cd aerogear-js-sdk
git clone git@github.com:aerogear/cordova-showcase-template.git cordova-example
```
Your SDK structure should now look like:
```
.
├── .circleci
├── .github
├── cordova-example 
├── docs
├── packages
|   ├── auth
|   └── core
├── scripts
.
.
.
```
## Installing dependencies
As we are developing and testing newly implemented features and changes we need to point our dependencies in the example app `package.json` to local versions of `core` and `auth`:

```
"dependencies": {		    
    "@aerogear/auth": "../packages/auth",		 
    "@aerogear/core": "../packages/core",
```

## Build the Application
To build the application we must ensure our example app is added to `lerna.json` file in the SDK.
```
{
  "lerna": "2.9.0",
  "packages": [
    "packages/*",
    "cordova-example" // -> add this here
  ],
```
From the SDK dir run the following to build and link the dependencies:
```
npm install
npm run bootstrap
npm run build
```
To run the application, run:
```
cd cordova-example
npm run ionic:android // -> android emulator must be running
npm run ionic:ios // -> ios emulator must be running
```

# Developing the Cordova Showcase Application Template to demo latest SDK

## Cloning the repository 
Clone the app:
```
git clone git@github.com:aerogear/cordova-showcase-template.git cordova-example
```

## Install Dependencies
Check [NPM](https://www.npmjs.com/org/aerogear) for latest version and run:
```
npm i @aerogear/auth
npm i @aerogear/core
```

## Build the Application
To build the application:
```
npm install
npm run ionic:build
```
To run the application enter one of the following:
```
npm run ionic:android // runs app in android emulator
npm run ionic:ios // runs app in ios emulator
```
Note: To run the app in an emulator, you must have an emulator currently running when entering the above command.

## Work with Different Backend Services

By default the app will use the backend services that are running on [a dedicated OpenShift cluster](https://security.skunkhenry.com:8443) for demonstration purpose.

You can also configure the app to run against different backend services:

1. Update the URLs in [mobile-services.json](src/mobile-services.json) file.
2. If you are using HTTPS, update the SHA1 fingerprint of the server certificate configuration in the [mobile-services.json](src/mobile-services.json) file.

To generate the SHA1 hash value of the certificate, you can use this command:
```
openssl s_client -servername <hostname> -connect <hostname:port> -showcerts < /dev/null 2>/dev/null   | openssl x509 -in /dev/stdin -sha1 -noout -fingerprint
```
