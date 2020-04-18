import { GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GlobalStats = {
  __typename?: "GlobalStats";
  studiedLessons?: Maybe<Scalars["Int"]>;
  greenLessons?: Maybe<Scalars["Int"]>;
  goldLessons?: Maybe<Scalars["Int"]>;
  studiedWords?: Maybe<Scalars["Int"]>;
  greenWords?: Maybe<Scalars["Int"]>;
  goldWords?: Maybe<Scalars["Int"]>;
  globalProgress?: Maybe<Scalars["Float"]>;
};

export enum Lessons {
  AnimalsBasics = "animalsBasics",
  Birds = "birds",
  FarmAnimals = "farmAnimals",
  Insects = "insects",
  Mammals1 = "mammals1",
  SeaAnimals = "seaAnimals",
  Accessories = "accessories",
  ClothesBasics = "clothesBasics",
  MoreClothes = "moreClothes",
  MainColors = "mainColors",
  Agriculture = "agriculture",
  Drinks = "drinks",
  FoodBasics = "foodBasics",
  Foods = "foods",
  Fruits = "fruits",
  MoreFruitsAndVegetables = "moreFruitsAndVegetables",
  Vegetables = "vegetables",
  ConstructionMaterials = "constructionMaterials",
  ConstructionTools = "constructionTools",
  Furniture = "furniture",
  House = "house",
  Housing = "housing",
  Rooms = "rooms",
  Head = "head",
  HumanBodyBasics = "humanBodyBasics",
  Limbs = "limbs",
  Organs = "organs",
  Senses = "senses",
  Earth = "earth",
  NatureBasics = "natureBasics",
  Sea = "sea",
  Universe = "universe",
  Weather1 = "weather1",
  Weather2 = "weather2",
  FirstNumbers = "firstNumbers",
  MoreNumbers = "moreNumbers",
  CloseFamily = "closeFamily",
  HumanBeings = "humanBeings",
  Identity = "identity",
  Introduction = "introduction",
  Buildings = "buildings",
  Town = "town",
  Transports = "transports",
  Days = "days",
  Months = "months",
  TimeBasics = "timeBasics",
  TimeDescription1 = "timeDescription1",
  TimeDescription2 = "timeDescription2",
  TimeDivisions = "timeDivisions",
  Plants = "plants",
  Trees = "trees",
  VegetalBasics = "vegetalBasics",
}

export type LessonScore = {
  __typename?: "LessonScore";
  animalsBasics?: Maybe<Scalars["Int"]>;
  birds?: Maybe<Scalars["Int"]>;
  farmAnimals?: Maybe<Scalars["Int"]>;
  insects?: Maybe<Scalars["Int"]>;
  mammals1?: Maybe<Scalars["Int"]>;
  seaAnimals?: Maybe<Scalars["Int"]>;
  accessories?: Maybe<Scalars["Int"]>;
  clothesBasics?: Maybe<Scalars["Int"]>;
  moreClothes?: Maybe<Scalars["Int"]>;
  mainColors?: Maybe<Scalars["Int"]>;
  agriculture?: Maybe<Scalars["Int"]>;
  drinks?: Maybe<Scalars["Int"]>;
  foodBasics?: Maybe<Scalars["Int"]>;
  foods?: Maybe<Scalars["Int"]>;
  fruits?: Maybe<Scalars["Int"]>;
  moreFruitsAndVegetables?: Maybe<Scalars["Int"]>;
  vegetables?: Maybe<Scalars["Int"]>;
  constructionMaterials?: Maybe<Scalars["Int"]>;
  constructionTools?: Maybe<Scalars["Int"]>;
  furniture?: Maybe<Scalars["Int"]>;
  house?: Maybe<Scalars["Int"]>;
  housing?: Maybe<Scalars["Int"]>;
  rooms?: Maybe<Scalars["Int"]>;
  head?: Maybe<Scalars["Int"]>;
  humanBodyBasics?: Maybe<Scalars["Int"]>;
  limbs?: Maybe<Scalars["Int"]>;
  organs?: Maybe<Scalars["Int"]>;
  senses?: Maybe<Scalars["Int"]>;
  earth?: Maybe<Scalars["Int"]>;
  natureBasics?: Maybe<Scalars["Int"]>;
  sea?: Maybe<Scalars["Int"]>;
  universe?: Maybe<Scalars["Int"]>;
  weather1?: Maybe<Scalars["Int"]>;
  weather2?: Maybe<Scalars["Int"]>;
  firstNumbers?: Maybe<Scalars["Int"]>;
  moreNumbers?: Maybe<Scalars["Int"]>;
  closeFamily?: Maybe<Scalars["Int"]>;
  humanBeings?: Maybe<Scalars["Int"]>;
  identity?: Maybe<Scalars["Int"]>;
  introduction?: Maybe<Scalars["Int"]>;
  buildings?: Maybe<Scalars["Int"]>;
  town?: Maybe<Scalars["Int"]>;
  transports?: Maybe<Scalars["Int"]>;
  days?: Maybe<Scalars["Int"]>;
  months?: Maybe<Scalars["Int"]>;
  timeBasics?: Maybe<Scalars["Int"]>;
  timeDescription1?: Maybe<Scalars["Int"]>;
  timeDescription2?: Maybe<Scalars["Int"]>;
  timeDivisions?: Maybe<Scalars["Int"]>;
  plants?: Maybe<Scalars["Int"]>;
  trees?: Maybe<Scalars["Int"]>;
  vegetalBasics?: Maybe<Scalars["Int"]>;
};

export type LessonsStats = {
  __typename?: "LessonsStats";
  animals?: Maybe<LessonScore>;
  clothes?: Maybe<LessonScore>;
  colors?: Maybe<LessonScore>;
  food?: Maybe<LessonScore>;
  habitation?: Maybe<LessonScore>;
  humanBody?: Maybe<LessonScore>;
  nature?: Maybe<LessonScore>;
  numbers?: Maybe<LessonScore>;
  socialLife?: Maybe<LessonScore>;
  society?: Maybe<LessonScore>;
  time?: Maybe<LessonScore>;
  vegetal?: Maybe<LessonScore>;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
};

export type Stats = {
  __typename?: "Stats";
  lessons?: Maybe<LessonsStats>;
  global?: Maybe<GlobalStats>;
};

export enum Topics {
  Animals = "animals",
  Clothes = "clothes",
  Colors = "colors",
  Food = "food",
  Habitation = "habitation",
  HumanBody = "humanBody",
  Nature = "nature",
  Numbers = "numbers",
  SocialLife = "socialLife",
  Society = "society",
  Time = "time",
  Vegetal = "vegetal",
}

export type User = {
  __typename?: "User";
  _id: Scalars["String"];
  email: Scalars["String"];
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
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Stats: ResolverTypeWrapper<Stats>;
  LessonsStats: ResolverTypeWrapper<LessonsStats>;
  LessonScore: ResolverTypeWrapper<LessonScore>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  GlobalStats: ResolverTypeWrapper<GlobalStats>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Lessons: Lessons;
  Topics: Topics;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  String: Scalars["String"];
  Stats: Stats;
  LessonsStats: LessonsStats;
  LessonScore: LessonScore;
  Int: Scalars["Int"];
  GlobalStats: GlobalStats;
  Float: Scalars["Float"];
  Boolean: Scalars["Boolean"];
  Lessons: Lessons;
  Topics: Topics;
};

export type GlobalStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GlobalStats"] = ResolversParentTypes["GlobalStats"]
> = {
  studiedLessons?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  greenLessons?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  goldLessons?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  studiedWords?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  greenWords?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  goldWords?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  globalProgress?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type LessonScoreResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LessonScore"] = ResolversParentTypes["LessonScore"]
> = {
  animalsBasics?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  birds?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  farmAnimals?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  insects?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  mammals1?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  seaAnimals?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  accessories?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  clothesBasics?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  moreClothes?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  mainColors?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  agriculture?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  drinks?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  foodBasics?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  foods?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  fruits?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  moreFruitsAndVegetables?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  vegetables?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  constructionMaterials?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  constructionTools?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  furniture?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  house?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  housing?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rooms?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  head?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  humanBodyBasics?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  limbs?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  organs?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  senses?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  earth?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  natureBasics?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  sea?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  universe?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  weather1?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  weather2?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  firstNumbers?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  moreNumbers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  closeFamily?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  humanBeings?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  identity?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  introduction?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  buildings?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  town?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  transports?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  days?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  months?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  timeBasics?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  timeDescription1?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  timeDescription2?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  timeDivisions?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  plants?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  trees?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  vegetalBasics?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type LessonsStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LessonsStats"] = ResolversParentTypes["LessonsStats"]
> = {
  animals?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  clothes?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  colors?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  food?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  habitation?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  humanBody?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  nature?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  numbers?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  socialLife?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  society?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  time?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  vegetal?: Resolver<
    Maybe<ResolversTypes["LessonScore"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type StatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Stats"] = ResolversParentTypes["Stats"]
> = {
  lessons?: Resolver<
    Maybe<ResolversTypes["LessonsStats"]>,
    ParentType,
    ContextType
  >;
  global?: Resolver<
    Maybe<ResolversTypes["GlobalStats"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  _id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes["Stats"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  GlobalStats?: GlobalStatsResolvers<ContextType>;
  LessonScore?: LessonScoreResolvers<ContextType>;
  LessonsStats?: LessonsStatsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
