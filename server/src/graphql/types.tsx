import { GraphQLResolveInfo } from 'graphql';
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

export enum Lessons {
  AnimalsBasics = 'animals_basics',
  Birds = 'birds',
  FarmAnimals = 'farm_animals',
  Insects = 'insects',
  Mammals_1 = 'mammals_1',
  SeaAnimals = 'sea_animals',
  Accessories = 'accessories',
  ClothesBasics = 'clothes_basics',
  MoreClothes = 'more_clothes',
  MainColors = 'main_colors',
  Agriculture = 'agriculture',
  Drinks = 'drinks',
  FoodBasics = 'food_basics',
  Foods = 'foods',
  Fruits = 'fruits',
  MoreFruitsAndVegetables = 'more_fruits_and_vegetables',
  Vegetables = 'vegetables',
  ConstructionMaterials = 'construction_materials',
  ConstructionTools = 'construction_tools',
  Furniture = 'furniture',
  House = 'house',
  Housing = 'housing',
  Rooms = 'rooms',
  Head = 'head',
  HumanBodyBasics = 'human_body_basics',
  Limbs = 'limbs',
  Organs = 'organs',
  Senses = 'senses',
  Earth = 'earth',
  NatureBasics = 'nature_basics',
  Sea = 'sea',
  Universe = 'universe',
  Weather_1 = 'weather_1',
  Weather_2 = 'weather_2',
  FirstNumbers = 'first_numbers',
  MoreNumbers = 'more_numbers',
  CloseFamily = 'close_family',
  HumanBeings = 'human_beings',
  Identity = 'identity',
  Introduction = 'introduction',
  Buildings = 'buildings',
  Town = 'town',
  Transports = 'transports',
  Days = 'days',
  Months = 'months',
  TimeBasics = 'time_basics',
  TimeDescription_1 = 'time_description_1',
  TimeDescription_2 = 'time_description_2',
  TimeDivisions = 'time_divisions',
  Plants = 'plants',
  Trees = 'trees',
  VegetalsBasics = 'vegetals_basics'
}

export type LessonScore = {
   __typename?: 'LessonScore';
  animals_basics?: Maybe<Scalars['Int']>;
  birds?: Maybe<Scalars['Int']>;
  farm_animals?: Maybe<Scalars['Int']>;
  insects?: Maybe<Scalars['Int']>;
  mammals_1?: Maybe<Scalars['Int']>;
  sea_animals?: Maybe<Scalars['Int']>;
  accessories?: Maybe<Scalars['Int']>;
  clothes_basics?: Maybe<Scalars['Int']>;
  more_clothes?: Maybe<Scalars['Int']>;
  main_colors?: Maybe<Scalars['Int']>;
  agriculture?: Maybe<Scalars['Int']>;
  drinks?: Maybe<Scalars['Int']>;
  food_basics?: Maybe<Scalars['Int']>;
  foods?: Maybe<Scalars['Int']>;
  fruits?: Maybe<Scalars['Int']>;
  more_fruits_and_vegetables?: Maybe<Scalars['Int']>;
  vegetables?: Maybe<Scalars['Int']>;
  construction_materials?: Maybe<Scalars['Int']>;
  construction_tools?: Maybe<Scalars['Int']>;
  furniture?: Maybe<Scalars['Int']>;
  house?: Maybe<Scalars['Int']>;
  housing?: Maybe<Scalars['Int']>;
  rooms?: Maybe<Scalars['Int']>;
  head?: Maybe<Scalars['Int']>;
  human_body_basics?: Maybe<Scalars['Int']>;
  limbs?: Maybe<Scalars['Int']>;
  organs?: Maybe<Scalars['Int']>;
  senses?: Maybe<Scalars['Int']>;
  earth?: Maybe<Scalars['Int']>;
  nature_basics?: Maybe<Scalars['Int']>;
  sea?: Maybe<Scalars['Int']>;
  universe?: Maybe<Scalars['Int']>;
  weather_1?: Maybe<Scalars['Int']>;
  weather_2?: Maybe<Scalars['Int']>;
  first_numbers?: Maybe<Scalars['Int']>;
  more_numbers?: Maybe<Scalars['Int']>;
  close_family?: Maybe<Scalars['Int']>;
  human_beings?: Maybe<Scalars['Int']>;
  identity?: Maybe<Scalars['Int']>;
  introduction?: Maybe<Scalars['Int']>;
  buildings?: Maybe<Scalars['Int']>;
  town?: Maybe<Scalars['Int']>;
  transports?: Maybe<Scalars['Int']>;
  days?: Maybe<Scalars['Int']>;
  months?: Maybe<Scalars['Int']>;
  time_basics?: Maybe<Scalars['Int']>;
  time_description_1?: Maybe<Scalars['Int']>;
  time_description_2?: Maybe<Scalars['Int']>;
  time_divisions?: Maybe<Scalars['Int']>;
  plants?: Maybe<Scalars['Int']>;
  trees?: Maybe<Scalars['Int']>;
  vegetals_basics?: Maybe<Scalars['Int']>;
};

export type LessonStats = {
   __typename?: 'LessonStats';
  animals?: Maybe<LessonScore>;
  clothes?: Maybe<LessonScore>;
  colors?: Maybe<LessonScore>;
  food?: Maybe<LessonScore>;
  habitation?: Maybe<LessonScore>;
  human_body?: Maybe<LessonScore>;
  nature?: Maybe<LessonScore>;
  numbers?: Maybe<LessonScore>;
  social_life?: Maybe<LessonScore>;
  society?: Maybe<LessonScore>;
  time?: Maybe<LessonScore>;
  vegetals?: Maybe<LessonScore>;
};

export type Query = {
   __typename?: 'Query';
  user?: Maybe<User>;
};

export type Stats = {
   __typename?: 'Stats';
  lessons?: Maybe<LessonStats>;
  topics?: Maybe<Scalars['String']>;
  global?: Maybe<Stats>;
};

export enum Topics {
  Animals = 'animals',
  Clothes = 'clothes',
  Colors = 'colors',
  Food = 'food',
  Habitation = 'habitation',
  HumanBody = 'human_body',
  Nature = 'nature',
  Numbers = 'numbers',
  SocialLife = 'social_life',
  Society = 'society',
  Time = 'time',
  Vegetals = 'vegetals'
}

export type User = {
   __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  stats?: Maybe<Stats>;
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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Stats: ResolverTypeWrapper<Stats>,
  LessonStats: ResolverTypeWrapper<LessonStats>,
  LessonScore: ResolverTypeWrapper<LessonScore>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Lessons: Lessons,
  Topics: Topics,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: User,
  String: Scalars['String'],
  Stats: Stats,
  LessonStats: LessonStats,
  LessonScore: LessonScore,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  Lessons: Lessons,
  Topics: Topics,
};

export type LessonScoreResolvers<ContextType = any, ParentType extends ResolversParentTypes['LessonScore'] = ResolversParentTypes['LessonScore']> = {
  animals_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  birds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  farm_animals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  insects?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  mammals_1?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  sea_animals?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  accessories?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  clothes_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  more_clothes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  main_colors?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  agriculture?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  drinks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  food_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  foods?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  fruits?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  more_fruits_and_vegetables?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  vegetables?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  construction_materials?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  construction_tools?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  furniture?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  house?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  housing?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  rooms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  head?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  human_body_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  limbs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  organs?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  senses?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  earth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  nature_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  sea?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  universe?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  weather_1?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  weather_2?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  first_numbers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  more_numbers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  close_family?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  human_beings?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  identity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  introduction?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  buildings?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  town?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  transports?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  days?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  months?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  time_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  time_description_1?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  time_description_2?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  time_divisions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  plants?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  trees?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  vegetals_basics?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LessonStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LessonStats'] = ResolversParentTypes['LessonStats']> = {
  animals?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  clothes?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  colors?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  food?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  habitation?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  human_body?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  nature?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  numbers?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  social_life?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  society?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  time?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  vegetals?: Resolver<Maybe<ResolversTypes['LessonScore']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = {
  lessons?: Resolver<Maybe<ResolversTypes['LessonStats']>, ParentType, ContextType>,
  topics?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  global?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  LessonScore?: LessonScoreResolvers<ContextType>,
  LessonStats?: LessonStatsResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Stats?: StatsResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

