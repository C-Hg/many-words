export enum CLIENTS {
  app,
  web,
}

export enum AuthorizationErrors {
  emailNotFound = "emailNotFound",
  internalError = "internalError",
  wrongTotp = "wrongTotp",
}

export const TOKEN_ISSUER = "ManyWords";

// 30 minutes in Epoch
export const APP_ACCESS_TOKEN_EXPIRATION = 30 * 60;

// 6 months in Epoch
export const WEB_ACCESS_TOKEN_EXPIRATION = 182 * 24 * 60 * 60;

// 5 years in Epoch
export const REFRESH_TOKEN_EXPIRATION = 5 * 365 * 24 * 60 * 60;
