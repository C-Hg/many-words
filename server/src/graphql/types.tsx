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

export type Curriculum = {
  nextExercise?: Maybe<NextExercise>;
  stats: CurriculumStats;
};

export type Exercise = {
  id: Scalars["String"];
  type: Scalars["String"];
  words: Array<Maybe<ExerciseWord>>;
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

export type NextExercise = {
  mode?: Maybe<NextExerciseMode>;
  ressourceId: Scalars["String"];
};

export type NextExerciseMode = "quiz";

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

export type CurriculumNames = "frenchEnglish";

export type ExerciseTypes = "learn" | "quiz" | "review";

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

export type CurriculumStats = {
  globalProgress: Scalars["Float"];
  goldLessons: Scalars["Int"];
  goldWords: Scalars["Int"];
  greenLessons: Scalars["Int"];
  greenWords: Scalars["Int"];
  studiedLessons: Scalars["Int"];
  studiedWords: Scalars["Int"];
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

export type Mutation = {
  /** update user stats after an exercise */
  updateStats: UpdateStatsMutationResponse;
  logInAppUser: Tokens;
  logInWebUser: MutationResult;
  sendTotp: MutationResult;
  createWebUser: MutationResult;
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

export type LessonsGrades = {
  green: Scalars["Int"];
  gold: Scalars["Int"];
};

export type UpdateStatsMutationResponse = {
  success: Scalars["Boolean"];
  user?: Maybe<User>;
};

export type SetLanguageMutationResponse = {
  user?: Maybe<User>;
  success: Scalars["Boolean"];
};

export type Query = {
  user: User;
  getAccessTokenWebUser: QueryResult;
  exercise: Exercise;
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
  language?: Maybe<Languages>;
  selectedCurriculumId: Scalars["String"];
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
  Curriculum: ResolverTypeWrapper<Curriculum>;
  Exercise: ResolverTypeWrapper<Exercise>;
  ExerciseWord: ResolverTypeWrapper<ExerciseWord>;
  NextExercise: ResolverTypeWrapper<NextExercise>;
  NextExerciseMode: NextExerciseMode;
  Word: ResolverTypeWrapper<Word>;
  WordData: ResolverTypeWrapper<WordData>;
  FormValue: ResolverTypeWrapper<FormValue>;
  CurriculumNames: CurriculumNames;
  ExerciseTypes: ExerciseTypes;
  EnglishForms: EnglishForms;
  FrenchForms: FrenchForms;
  Forms: Forms;
  Languages: Languages;
  Lesson: Lesson;
  Topic: Topic;
  CurriculumStats: ResolverTypeWrapper<CurriculumStats>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  FormResultInput: FormResultInput;
  FormStats: ResolverTypeWrapper<FormStats>;
  Mutation: ResolverTypeWrapper<{}>;
  LessonsGrades: ResolverTypeWrapper<LessonsGrades>;
  UpdateStatsMutationResponse: ResolverTypeWrapper<UpdateStatsMutationResponse>;
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
  Curriculum: Curriculum;
  Exercise: Exercise;
  ExerciseWord: ExerciseWord;
  NextExercise: NextExercise;
  Word: Word;
  WordData: WordData;
  FormValue: FormValue;
  CurriculumStats: CurriculumStats;
  Float: Scalars["Float"];
  FormResultInput: FormResultInput;
  FormStats: FormStats;
  Mutation: {};
  LessonsGrades: LessonsGrades;
  UpdateStatsMutationResponse: UpdateStatsMutationResponse;
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

export type CurriculumResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Curriculum"] = ResolversParentTypes["Curriculum"]
> = {
  nextExercise?: Resolver<
    Maybe<ResolversTypes["NextExercise"]>,
    ParentType,
    ContextType
  >;
  stats?: Resolver<ResolversTypes["CurriculumStats"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExerciseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Exercise"] = ResolversParentTypes["Exercise"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  words?: Resolver<
    Array<Maybe<ResolversTypes["ExerciseWord"]>>,
    ParentType,
    ContextType
  >;
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

export type NextExerciseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["NextExercise"] = ResolversParentTypes["NextExercise"]
> = {
  mode?: Resolver<
    Maybe<ResolversTypes["NextExerciseMode"]>,
    ParentType,
    ContextType
  >;
  ressourceId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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

export type CurriculumStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CurriculumStats"] = ResolversParentTypes["CurriculumStats"]
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

export type FormStatsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FormStats"] = ResolversParentTypes["FormStats"]
> = {
  language?: Resolver<ResolversTypes["Languages"], ParentType, ContextType>;
  form?: Resolver<ResolversTypes["Forms"], ParentType, ContextType>;
  score?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  updateStats?: Resolver<
    ResolversTypes["UpdateStatsMutationResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateStatsArgs, never>
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
  createWebUser?: Resolver<
    ResolversTypes["MutationResult"],
    ParentType,
    ContextType
  >;
  setLanguage?: Resolver<
    ResolversTypes["SetLanguageMutationResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationSetLanguageArgs, "language">
  >;
};

export type LessonsGradesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LessonsGrades"] = ResolversParentTypes["LessonsGrades"]
> = {
  green?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  gold?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateStatsMutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateStatsMutationResponse"] = ResolversParentTypes["UpdateStatsMutationResponse"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
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
  exercise?: Resolver<ResolversTypes["Exercise"], ParentType, ContextType>;
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
  selectedCurriculumId?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  MutationResult?: MutationResultResolvers<ContextType>;
  QueryResult?: QueryResultResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  Curriculum?: CurriculumResolvers<ContextType>;
  Exercise?: ExerciseResolvers<ContextType>;
  ExerciseWord?: ExerciseWordResolvers<ContextType>;
  NextExercise?: NextExerciseResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
  WordData?: WordDataResolvers<ContextType>;
  FormValue?: FormValueResolvers<ContextType>;
  CurriculumStats?: CurriculumStatsResolvers<ContextType>;
  FormStats?: FormStatsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  LessonsGrades?: LessonsGradesResolvers<ContextType>;
  UpdateStatsMutationResponse?: UpdateStatsMutationResponseResolvers<ContextType>;
  SetLanguageMutationResponse?: SetLanguageMutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
