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

export type EnglishForms = "plural" | "singular" | "uniqueForm";

export type ExerciseWord = {
  answers: Array<Scalars["String"]>;
  englishName: Scalars["String"];
  form: Forms;
  language: Languages;
  lesson: Lesson;
  topic: Topic;
  wordToTranslate: Scalars["String"];
};

export type FormResultInput = {
  englishName: Scalars["String"];
  form?: Maybe<Forms>;
  isAnswerCorrect: Scalars["Boolean"];
  language: Languages;
};

export type Forms =
  | "plural"
  | "pluralFeminine"
  | "pluralMasculine"
  | "singular"
  | "singularFeminine"
  | "singularMasculine"
  | "uniqueForm";

export type FormStats = {
  language: Languages;
  form: Forms;
  score: Scalars["Float"];
};

export type FormValue = {
  form: Forms;
  values: Array<Scalars["String"]>;
};

export type FrenchForms =
  | "pluralFeminine"
  | "pluralMasculine"
  | "singularFeminine"
  | "singularMasculine"
  | "uniqueForm";

export type GlobalStats = {
  globalProgress: Scalars["Float"];
  goldLessons: Scalars["Int"];
  goldWords: Scalars["Int"];
  greenLessons: Scalars["Int"];
  greenWords: Scalars["Int"];
  studiedLessons: Scalars["Int"];
  studiedWords: Scalars["Int"];
};

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

export type LessonsGrades = {
  green: Scalars["Int"];
  gold: Scalars["Int"];
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

export type Mutation = {
  /** update user stats after an exercise */
  updateStats?: Maybe<User>;
};

export type MutationUpdateStatsArgs = {
  results?: Maybe<Array<Maybe<FormResultInput>>>;
};

export type Query = {
  user?: Maybe<User>;
  exercise?: Maybe<Array<Maybe<ExerciseWord>>>;
};

export type QueryExerciseArgs = {
  id: Lesson;
};

export type Stats = {
  global: GlobalStats;
  lessons: LessonsScores;
  topics: Array<Maybe<TopicStats>>;
};

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

/** TopicsStats aggregates the lessons' stats, by topic */
export type TopicStats = {
  id: Scalars["String"];
  lessonsGrades: LessonsGrades;
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
  stats: Stats;
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
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Stats: ResolverTypeWrapper<Stats>;
  GlobalStats: ResolverTypeWrapper<GlobalStats>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  LessonsScores: ResolverTypeWrapper<LessonsScores>;
  TopicStats: ResolverTypeWrapper<TopicStats>;
  LessonsGrades: ResolverTypeWrapper<LessonsGrades>;
  Lesson: Lesson;
  ExerciseWord: ResolverTypeWrapper<ExerciseWord>;
  Forms: Forms;
  Languages: Languages;
  Topic: Topic;
  Mutation: ResolverTypeWrapper<{}>;
  FormResultInput: FormResultInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Word: ResolverTypeWrapper<Word>;
  WordData: ResolverTypeWrapper<WordData>;
  FormValue: ResolverTypeWrapper<FormValue>;
  FormStats: ResolverTypeWrapper<FormStats>;
  EnglishForms: EnglishForms;
  FrenchForms: FrenchForms;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Stats: Stats;
  GlobalStats: GlobalStats;
  Float: Scalars["Float"];
  Int: Scalars["Int"];
  LessonsScores: LessonsScores;
  TopicStats: TopicStats;
  LessonsGrades: LessonsGrades;
  Lesson: Lesson;
  ExerciseWord: ExerciseWord;
  Forms: Forms;
  Languages: Languages;
  Topic: Topic;
  Mutation: {};
  FormResultInput: FormResultInput;
  Boolean: Scalars["Boolean"];
  Word: Word;
  WordData: WordData;
  FormValue: FormValue;
  FormStats: FormStats;
  EnglishForms: EnglishForms;
  FrenchForms: FrenchForms;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FormStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormStats"] = ResolversParentTypes["FormStats"]
> = {
  language?: Resolver<ResolversTypes["Languages"], ParentType, ContextType>;
  form?: Resolver<ResolversTypes["Forms"], ParentType, ContextType>;
  score?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FormValueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormValue"] = ResolversParentTypes["FormValue"]
> = {
  form?: Resolver<ResolversTypes["Forms"], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type LessonsGradesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LessonsGrades"] = ResolversParentTypes["LessonsGrades"]
> = {
  green?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  gold?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  exercise?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ExerciseWord"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryExerciseArgs, "id">
  >;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  stats?: Resolver<ResolversTypes["Stats"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type WordDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["WordData"] = ResolversParentTypes["WordData"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  words?: Resolver<Array<ResolversTypes["FormValue"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  ExerciseWord?: ExerciseWordResolvers<ContextType>;
  FormStats?: FormStatsResolvers<ContextType>;
  FormValue?: FormValueResolvers<ContextType>;
  GlobalStats?: GlobalStatsResolvers<ContextType>;
  LessonsGrades?: LessonsGradesResolvers<ContextType>;
  LessonsScores?: LessonsScoresResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  TopicStats?: TopicStatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
  WordData?: WordDataResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
