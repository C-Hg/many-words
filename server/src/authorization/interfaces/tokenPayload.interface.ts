export enum TokenTypes {
  access = "access",
  refresh = "refresh",
}

export interface TokenPayload {
  // the expiration date of the token in seconds since epoch
  exp: number;
  // the issuance date of the token in seconds since epoch
  iat: number;
  // the issuer of the token
  iss: string;
  // the userId
  sub: string;
  tokenUse: TokenTypes;
}
