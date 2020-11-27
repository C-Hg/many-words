import { GraphQLResolveInfo } from "graphql";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
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

export type MutationResult = {
  success: Scalars["Boolean"];
};

export type QueryResult = {
  success: Scalars["Boolean"];
};

export type Tokens = {
  accessToken: Scalars["String"];
  error?: Maybe<Scalars["String"]>;
  refreshToken: Scalars["String"];
};

export type ExerciseWord = {
  answers: Array<Scalars["String"]>;
  englishName: Scalars["String"];
  form: Forms;
  language: Languages;
  lesson: Lesson;
  topic: Topic;
  wordToTranslate: Scalars["String"];
};

export type Word = {
  english: WordData;
  french: WordData;
  hasUniqueForm: Scalars["Boolean"];
  lesson: Lesson;
  topic: Topic;
  type: Scalars["String"];
  weakestForms: Array<Maybe<FormStats>>;
};

export type WordData = {
  name: Scalars["String"];
  words: Array<FormValue>;
};

export type FormValue = {
  form: Forms;
  values: Array<Scalars["String"]>;
};

export type EnglishForms = "plural" | "singular" | "uniqueForm";

export type FrenchForms =
  | "pluralFeminine"
  | "pluralMasculine"
  | "singularFeminine"
  | "singularMasculine"
  | "uniqueForm";

export type Forms =
  | "plural"
  | "pluralFeminine"
  | "pluralMasculine"
  | "singular"
  | "singularFeminine"
  | "singularMasculine"
  | "uniqueForm";

export type Languages = "english" | "french";

export type Lesson =
  | "animalsBasics"
  | "birds"
  | "farmAnimals"
  | "insects"
  | "mammals1"
  | "seaAnimals"
  | "accessories"
  | "clothesBasics"
  | "moreClothes"
  | "mainColors"
  | "agriculture"
  | "drinks"
  | "foodBasics"
  | "foods"
  | "fruits"
  | "moreFruitsAndVegetables"
  | "vegetables"
  | "constructionMaterials"
  | "constructionTools"
  | "furniture"
  | "house"
  | "housing"
  | "rooms"
  | "head"
  | "humanBodyBasics"
  | "limbs"
  | "organs"
  | "senses"
  | "earth"
  | "natureBasics"
  | "sea"
  | "universe"
  | "weather1"
  | "weather2"
  | "firstNumbers"
  | "moreNumbers"
  | "closeFamily"
  | "humanBeings"
  | "identity"
  | "introduction"
  | "buildings"
  | "town"
  | "transports"
  | "days"
  | "months"
  | "timeBasics"
  | "timeDescription1"
  | "timeDescription2"
  | "timeDivisions"
  | "plants"
  | "trees"
  | "vegetalBasics";

export type Topic =
  | "animals"
  | "clothes"
  | "colors"
  | "food"
  | "habitation"
  | "humanBody"
  | "nature"
  | "numbers"
  | "socialLife"
  | "society"
  | "time"
  | "vegetal";

export type Mutation = {
  /** update user stats after an exercise */
  updateStats?: Maybe<User>;
  createAppUser: Tokens;
  createWebUser: MutationResult;
  logInAppUser: Tokens;
  logInWebUser: MutationResult;
  sendTotp: MutationResult;
  setLanguage: SetLanguageMutationResponse;
};

export type MutationUpdateStatsArgs = {
  results?: Maybe<Array<Maybe<FormResultInput>>>;
};

export type MutationLogInAppUserArgs = {
  loginInput: LoginInput;
};

export type MutationLogInWebUserArgs = {
  loginInput: LoginInput;
};

export type MutationSendTotpArgs = {
  email: Scalars["String"];
};

export type MutationSetLanguageArgs = {
  language: Languages;
};

export type FormResultInput = {
  englishName: Scalars["String"];
  form?: Maybe<Forms>;
  isAnswerCorrect: Scalars["Boolean"];
  language: Languages;
};

export type FormStats = {
  language: Languages;
  form: Forms;
  score: Scalars["Float"];
};

export type Stats = {
  global: GlobalStats;
  lessons: LessonsScores;
  topics: Array<Maybe<TopicStats>>;
};

export type GlobalStats = {
  globalProgress: Scalars["Float"];
  goldLessons: Scalars["Int"];
  goldWords: Scalars["Int"];
  greenLessons: Scalars["Int"];
  greenWords: Scalars["Int"];
  studiedLessons: Scalars["Int"];
  studiedWords: Scalars["Int"];
};

/** LessonsScores associates a score to each lesson id */
export type LessonsScores = {
  animalsBasics?: Maybe<Scalars["Float"]>;
  birds?: Maybe<Scalars["Float"]>;
  farmAnimals?: Maybe<Scalars["Float"]>;
  insects?: Maybe<Scalars["Float"]>;
  mammals1?: Maybe<Scalars["Float"]>;
  seaAnimals?: Maybe<Scalars["Float"]>;
  accessories?: Maybe<Scalars["Float"]>;
  clothesBasics?: Maybe<Scalars["Float"]>;
  moreClothes?: Maybe<Scalars["Float"]>;
  mainColors?: Maybe<Scalars["Float"]>;
  agriculture?: Maybe<Scalars["Float"]>;
  drinks?: Maybe<Scalars["Float"]>;
  foodBasics?: Maybe<Scalars["Float"]>;
  foods?: Maybe<Scalars["Float"]>;
  fruits?: Maybe<Scalars["Float"]>;
  moreFruitsAndVegetables?: Maybe<Scalars["Float"]>;
  vegetables?: Maybe<Scalars["Float"]>;
  constructionMaterials?: Maybe<Scalars["Float"]>;
  constructionTools?: Maybe<Scalars["Float"]>;
  furniture?: Maybe<Scalars["Float"]>;
  house?: Maybe<Scalars["Float"]>;
  housing?: Maybe<Scalars["Float"]>;
  rooms?: Maybe<Scalars["Float"]>;
  head?: Maybe<Scalars["Float"]>;
  humanBodyBasics?: Maybe<Scalars["Float"]>;
  limbs?: Maybe<Scalars["Float"]>;
  organs?: Maybe<Scalars["Float"]>;
  senses?: Maybe<Scalars["Float"]>;
  earth?: Maybe<Scalars["Float"]>;
  natureBasics?: Maybe<Scalars["Float"]>;
  sea?: Maybe<Scalars["Float"]>;
  universe?: Maybe<Scalars["Float"]>;
  weather1?: Maybe<Scalars["Float"]>;
  weather2?: Maybe<Scalars["Float"]>;
  firstNumbers?: Maybe<Scalars["Float"]>;
  moreNumbers?: Maybe<Scalars["Float"]>;
  closeFamily?: Maybe<Scalars["Float"]>;
  humanBeings?: Maybe<Scalars["Float"]>;
  identity?: Maybe<Scalars["Float"]>;
  introduction?: Maybe<Scalars["Float"]>;
  buildings?: Maybe<Scalars["Float"]>;
  town?: Maybe<Scalars["Float"]>;
  transports?: Maybe<Scalars["Float"]>;
  days?: Maybe<Scalars["Float"]>;
  months?: Maybe<Scalars["Float"]>;
  timeBasics?: Maybe<Scalars["Float"]>;
  timeDescription1?: Maybe<Scalars["Float"]>;
  timeDescription2?: Maybe<Scalars["Float"]>;
  timeDivisions?: Maybe<Scalars["Float"]>;
  plants?: Maybe<Scalars["Float"]>;
  trees?: Maybe<Scalars["Float"]>;
  vegetalBasics?: Maybe<Scalars["Float"]>;
};

/** TopicsStats aggregates the lessons' stats, by topic */
export type TopicStats = {
  id: Scalars["String"];
  lessonsGrades: LessonsGrades;
};

export type LessonsGrades = {
  green: Scalars["Int"];
  gold: Scalars["Int"];
};

export type SetLanguageMutationResponse = {
  user?: Maybe<User>;
  success: Scalars["Boolean"];
};

export type Query = {
  user: User;
  getAccessTokenWebUser: QueryResult;
  exercise?: Maybe<Array<Maybe<ExerciseWord>>>;
};

export type QueryExerciseArgs = {
  id: Lesson;
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
  language?: Maybe<Languages>;
  stats: Stats;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
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
  LoginInput: LoginInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  MutationResult: ResolverTypeWrapper<MutationResult>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  QueryResult: ResolverTypeWrapper<QueryResult>;
  Tokens: ResolverTypeWrapper<Tokens>;
  ExerciseWord: ResolverTypeWrapper<ExerciseWord>;
  Word: ResolverTypeWrapper<Word>;
  WordData: ResolverTypeWrapper<WordData>;
  FormValue: ResolverTypeWrapper<FormValue>;
  EnglishForms: EnglishForms;
  FrenchForms: FrenchForms;
  Forms: Forms;
  Languages: Languages;
  Lesson: Lesson;
  Topic: Topic;
  Mutation: ResolverTypeWrapper<{}>;
  FormResultInput: FormResultInput;
  FormStats: ResolverTypeWrapper<FormStats>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Stats: ResolverTypeWrapper<Stats>;
  GlobalStats: ResolverTypeWrapper<GlobalStats>;
  LessonsScores: ResolverTypeWrapper<LessonsScores>;
  TopicStats: ResolverTypeWrapper<TopicStats>;
  LessonsGrades: ResolverTypeWrapper<LessonsGrades>;
  SetLanguageMutationResponse: ResolverTypeWrapper<SetLanguageMutationResponse>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  LoginInput: LoginInput;
  String: Scalars["String"];
  Int: Scalars["Int"];
  MutationResult: MutationResult;
  Boolean: Scalars["Boolean"];
  QueryResult: QueryResult;
  Tokens: Tokens;
  ExerciseWord: ExerciseWord;
  Word: Word;
  WordData: WordData;
  FormValue: FormValue;
  Mutation: {};
  FormResultInput: FormResultInput;
  FormStats: FormStats;
  Float: Scalars["Float"];
  Stats: Stats;
  GlobalStats: GlobalStats;
  LessonsScores: LessonsScores;
  TopicStats: TopicStats;
  LessonsGrades: LessonsGrades;
  SetLanguageMutationResponse: SetLanguageMutationResponse;
  Query: {};
  User: User;
  ID: Scalars["ID"];
};

export type MutationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationResult"] = ResolversParentTypes["MutationResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["QueryResult"] = ResolversParentTypes["QueryResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tokens"] = ResolversParentTypes["Tokens"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseWordResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ExerciseWord"] = ResolversParentTypes["ExerciseWord"]
> = {
  answers?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  englishName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  form?: Resolver<ResolversTypes["Forms"], ParentType, ContextType>;
  language?: Resolver<ResolversTypes["Languages"], ParentType, ContextType>;
  lesson?: Resolver<ResolversTypes["Lesson"], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes["Topic"], ParentType, ContextType>;
  wordToTranslate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Word"] = ResolversParentTypes["Word"]
> = {
  english?: Resolver<ResolversTypes["WordData"], ParentType, ContextType>;
  french?: Resolver<ResolversTypes["WordData"], ParentType, ContextType>;
  hasUniqueForm?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  lesson?: Resolver<ResolversTypes["Lesson"], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes["Topic"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  weakestForms?: Resolver<
    Array<Maybe<ResolversTypes["FormStats"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["WordData"] = ResolversParentTypes["WordData"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  words?: Resolver<Array<ResolversTypes["FormValue"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormValueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormValue"] = ResolversParentTypes["FormValue"]
> = {
  form?: Resolver<ResolversTypes["Forms"], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  updateStats?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateStatsArgs, never>
  >;
  createAppUser?: Resolver<ResolversTypes["Tokens"], ParentType, ContextType>;
  createWebUser?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType
  >;
  logInAppUser?: Resolver<
    ResolversTypes["Tokens"],
    ParentType,
    ContextType,
    RequireFields<MutationLogInAppUserArgs, "loginInput">
  >;
  logInWebUser?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationLogInWebUserArgs, "loginInput">
  >;
  sendTotp?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationSendTotpArgs, "email">
  >;
  setLanguage?: Resolver<
    ResolversTypes["SetLanguageMutationResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationSetLanguageArgs, "language">
  >;
};

export type FormStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormStats"] = ResolversParentTypes["FormStats"]
> = {
  language?: Resolver<ResolversTypes["Languages"], ParentType, ContextType>;
  form?: Resolver<ResolversTypes["Forms"], ParentType, ContextType>;
  score?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Stats"] = ResolversParentTypes["Stats"]
> = {
  global?: Resolver<ResolversTypes["GlobalStats"], ParentType, ContextType>;
  lessons?: Resolver<ResolversTypes["LessonsScores"], ParentType, ContextType>;
  topics?: Resolver<
    Array<Maybe<ResolversTypes["TopicStats"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GlobalStats"] = ResolversParentTypes["GlobalStats"]
> = {
  globalProgress?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  goldLessons?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  goldWords?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  greenLessons?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  greenWords?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  studiedLessons?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  studiedWords?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LessonsScoresResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LessonsScores"] = ResolversParentTypes["LessonsScores"]
> = {
  animalsBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  birds?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  farmAnimals?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  insects?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mammals1?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  seaAnimals?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  accessories?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  clothesBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  moreClothes?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  mainColors?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  agriculture?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  drinks?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  foodBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  foods?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  fruits?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  moreFruitsAndVegetables?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  vegetables?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  constructionMaterials?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  constructionTools?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  furniture?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  house?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  housing?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  rooms?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  head?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  humanBodyBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  limbs?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  organs?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  senses?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  earth?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  natureBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  sea?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  universe?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  weather1?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  weather2?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  firstNumbers?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  moreNumbers?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  closeFamily?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  humanBeings?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  identity?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  introduction?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  buildings?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  town?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  transports?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  days?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  months?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  timeBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  timeDescription1?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  timeDescription2?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  timeDivisions?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  plants?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  trees?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  vegetalBasics?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TopicStats"] = ResolversParentTypes["TopicStats"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lessonsGrades?: Resolver<
    ResolversTypes["LessonsGrades"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LessonsGradesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LessonsGrades"] = ResolversParentTypes["LessonsGrades"]
> = {
  green?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  gold?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetLanguageMutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SetLanguageMutationResponse"] = ResolversParentTypes["SetLanguageMutationResponse"]
> = {
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  getAccessTokenWebUser?: Resolver<
    ResolversTypes["QueryResult"],
    ParentType,
    ContextType
  >;
  exercise?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ExerciseWord"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryExerciseArgs, "id">
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  language?: Resolver<
    Maybe<ResolversTypes["Languages"]>,
    ParentType,
    ContextType
  >;
  stats?: Resolver<ResolversTypes["Stats"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  MutationResult?: MutationResultResolvers<ContextType>;
  QueryResult?: QueryResultResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  ExerciseWord?: ExerciseWordResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
  WordData?: WordDataResolvers<ContextType>;
  FormValue?: FormValueResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  FormStats?: FormStatsResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  GlobalStats?: GlobalStatsResolvers<ContextType>;
  LessonsScores?: LessonsScoresResolvers<ContextType>;
  TopicStats?: TopicStatsResolvers<ContextType>;
  LessonsGrades?: LessonsGradesResolvers<ContextType>;
  SetLanguageMutationResponse?: SetLanguageMutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
