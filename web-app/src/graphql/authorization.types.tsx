import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars['String'];
  totp: Scalars['Int'];
};

export type Mutation = {
  createAppUser: Tokens;
  createWebUser: MutationResult;
};

export type MutationResult = {
  success: Scalars['Boolean'];
};

export type Query = {
  getAccessToken: Scalars['String'];
  logInAppUser: Tokens;
  logInWebUser: MutationResult;
  sendTotp: MutationResult;
};


export type QueryGetAccessTokenArgs = {
  refreshToken: Scalars['String'];
};


export type QueryLogInAppUserArgs = {
  loginInput: LoginInput;
};


export type QueryLogInWebUserArgs = {
  loginInput: LoginInput;
};


export type QuerySendTotpArgs = {
  email: Scalars['String'];
};

export type Tokens = {
  accessToken: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
};


