import { GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";

export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginInput = {
  email: Scalars["String"];
  totp: Scalars["Int"];
};

export type Mutation = {
  createAppUser: Tokens;
  createWebUser: MutationResult;
};

export type MutationResult = {
  success: Scalars["Boolean"];
};

export type Query = {
  getAccessToken: Scalars["String"];
  logInAppUser: Tokens;
  logInWebUser: MutationResult;
  sendTotp: MutationResult;
};

export type QueryGetAccessTokenArgs = {
  refreshToken: Scalars["String"];
};

export type QueryLogInAppUserArgs = {
  loginInput: LoginInput;
};

export type QueryLogInWebUserArgs = {
  loginInput: LoginInput;
};

export type QuerySendTotpArgs = {
  email: Scalars["String"];
};

export type Tokens = {
  accessToken: Scalars["String"];
  error?: Maybe<Scalars["String"]>;
  refreshToken: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  LoginInput: LoginInput;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Tokens: ResolverTypeWrapper<Tokens>;
  MutationResult: ResolverTypeWrapper<MutationResult>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  LoginInput: LoginInput;
  Int: Scalars["Int"];
  Tokens: Tokens;
  MutationResult: MutationResult;
  Boolean: Scalars["Boolean"];
  Mutation: {};
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createAppUser?: Resolver<ResolversTypes["Tokens"], ParentType, ContextType>;
  createWebUser?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType
  >;
};

export type MutationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationResult"] = ResolversParentTypes["MutationResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getAccessToken?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<QueryGetAccessTokenArgs, "refreshToken">
  >;
  logInAppUser?: Resolver<
    ResolversTypes["Tokens"],
    ParentType,
    ContextType,
    RequireFields<QueryLogInAppUserArgs, "loginInput">
  >;
  logInWebUser?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType,
    RequireFields<QueryLogInWebUserArgs, "loginInput">
  >;
  sendTotp?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType,
    RequireFields<QuerySendTotpArgs, "email">
  >;
};

export type TokensResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tokens"] = ResolversParentTypes["Tokens"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  MutationResult?: MutationResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
