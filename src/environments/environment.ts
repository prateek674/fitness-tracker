// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { env_consts } from "./env-consts";

export const environment = {
  production: false,
  firebase: {
    apiKey: env_consts.apiKey,
    authDomain: env_consts.authDomain,
    projectId: env_consts.projectId,
    storageBucket: env_consts.storageBucket,
    messagingSenderId: env_consts.messagingSenderId,
    appId: env_consts.appId
  }
};
