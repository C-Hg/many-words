import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  getAccessTokenWebUser: QueryResult;
};

export type LoginInput = {
  email: Scalars['String'];
  totp: Scalars['Int'];
};

export type Mutation = {
  createAppUser: Tokens;
  createWebUser: MutationResult;
  logInAppUser: Tokens;
  logInWebUser: MutationResult;
  sendTotp: MutationResult;
};


export type MutationLogInAppUserArgs = {
  loginInput: LoginInput;
};


export type MutationLogInWebUserArgs = {
  loginInput: LoginInput;
};


export type MutationSendTotpArgs = {
  email: Scalars['String'];
};

export type MutationResult = {
  success: Scalars['Boolean'];
};

export type QueryResult = {
  success: Scalars['Boolean'];
};

export type Tokens = {
  accessToken: Scalars['String'];
  error?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
};
