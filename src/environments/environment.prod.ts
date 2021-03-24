import { env_consts } from "./env-consts";

export const environment = {
  production: true,
  firebase: {
    apiKey: env_consts.apiKey,
    authDomain: env_consts.authDomain,
    projectId: env_consts.projectId,
    storageBucket: env_consts.storageBucket,
    messagingSenderId: env_consts.messagingSenderId,
    appId: env_consts.appId
  }
}