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

export type Mutation = {
  createUser?: Maybe<Tokens>;
};

export type Query = {
  getAccessToken?: Maybe<Scalars["String"]>;
  loginWithTotp: Result;
};

export type QueryGetAccessTokenArgs = {
  refreshToken: Scalars["String"];
};

export type QueryLoginWithTotpArgs = {
  email: Scalars["String"];
};

export type Result = {
  success: Scalars["Boolean"];
};

export type Tokens = {
  accessToken: Scalars["String"];
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
  Result: ResolverTypeWrapper<Result>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Tokens: ResolverTypeWrapper<Tokens>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  Result: Result;
  Boolean: Scalars["Boolean"];
  Mutation: {};
  Tokens: Tokens;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createUser?: Resolver<
    Maybe<ResolversTypes["Tokens"]>,
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getAccessToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAccessTokenArgs, "refreshToken">
  >;
  loginWithTotp?: Resolver<
    ResolversTypes["Result"],
    ParentType,
    ContextType,
    RequireFields<QueryLoginWithTotpArgs, "email">
  >;
};

export type ResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Result"] = ResolversParentTypes["Result"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TokensResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tokens"] = ResolversParentTypes["Tokens"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
