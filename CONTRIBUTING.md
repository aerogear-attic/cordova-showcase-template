# Contributing to the Cordova Showcase Application Template

The Cordova Showcase Application Template is part of the [AeroGear project](https://aerogear.org/), see the [Community Page](https://aerogear.org/community) for general guidelines for contributing to the project.

This document details specifics for contributions to the Android SDK.

## Issue tracker

The tracking of issues for the AeroGear Android SDK is done in the [AeroGear Android Project](https://issues.jboss.org/projects/AEROGEAR/issues) in the [JBoss Developer JIRA](https://issues.jboss.org).

See the [AeroGear JIRA Usage and Guidelines Guide](https://aerogear.org/docs/guides/JIRAUsage/) for information on how the issue tracker relates to contributions to this project.

## Asking for help

Whether you're contributing a new feature or bug fix, or simply submitting a
ticket, the Aerogear team is available for technical advice or feedback. 
You can reach us at [#aerogear](ircs://chat.freenode.net:6697/aerogear) on [Freenode IRC](https://freenode.net/) or the 
[aerogear google group](https://groups.google.com/forum/#!forum/aerogear)
-- both are actively monitored.

## Prerequisites

Ensure you have the following installed in your machine:

- [Node](https://nodejs.org/en/)
- [Ionic](https://ionicframework.com/)
- [Cordova](https://cordova.apache.org/)


# Developing the Cordova Showcase Application Template for testing new SDK features
Changes made to the application while testing SDK changes should never be merged to the `master` branch until those changes have been released, it is the idea to keep this as a Showcase app to demo our latest release.

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
## Installing dependencies
As we are developing and testing newly implemented features and changes we need to point our dependencies in the example app `package.json` to local versions of `core` and `auth`:

```
"dependencies": {		    
    "@aerogear/auth": "../packages/auth",		 
    "@aerogear/core": "../packages/core",
```
Note: due to limitations, we need to reference the `auth` and `core` dependencies in our showcase app `package.json`.

## Build the Application
Once packages have been referenced we can run the application for development:
```
npm install
npm run ionic:build
npm run ionic:serve
```
Note: durning development `ionic:serve` will watch the project and hot reload on changes.

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
npm run ionic:serve // runs app in browser
npm run ionic:android // runs app in android emulator
npm run ionic:ios // runs app in ios emulator
```
Note: To run the app in an emulator, you must have an emulator currently running when entering the above command.