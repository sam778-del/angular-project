// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiUrl: 'http://69.57.161.71',
  facebookAppId: '198957499620537',
  auth0: {
    domain: 'dev-5tf99p7c.us.auth0.com',
    clientId: 'GBPB42qhMWCtvrwGmYxvm5cbHXU68nzG',
    redirectUri: 'http://69.57.161.71/auth0',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
