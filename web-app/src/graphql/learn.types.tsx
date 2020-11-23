import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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

export type ExerciseWord = {
  answers: Array<Scalars['String']>;
  englishName: Scalars['String'];
  form: Forms;
  language: Languages;
  lesson: Lesson;
  topic: Topic;
  wordToTranslate: Scalars['String'];
};

export type Word = {
  english: WordData;
  french: WordData;
  hasUniqueForm: Scalars['Boolean'];
  lesson: Lesson;
  topic: Topic;
  type: Scalars['String'];
  weakestForms: Array<Maybe<FormStats>>;
};

export type WordData = {
  name: Scalars['String'];
  words: Array<FormValue>;
};

export type FormValue = {
  form: Forms;
  values: Array<Scalars['String']>;
};

export type EnglishForms = 
  | 'plural'
  | 'singular'
  | 'uniqueForm';

export type FrenchForms = 
  | 'pluralFeminine'
  | 'pluralMasculine'
  | 'singularFeminine'
  | 'singularMasculine'
  | 'uniqueForm';

export type Forms = 
  | 'plural'
  | 'pluralFeminine'
  | 'pluralMasculine'
  | 'singular'
  | 'singularFeminine'
  | 'singularMasculine'
  | 'uniqueForm';

export type Languages = 
  | 'english'
  | 'french';

export type Lesson = 
  | 'animalsBasics'
  | 'birds'
  | 'farmAnimals'
  | 'insects'
  | 'mammals1'
  | 'seaAnimals'
  | 'accessories'
  | 'clothesBasics'
  | 'moreClothes'
  | 'mainColors'
  | 'agriculture'
  | 'drinks'
  | 'foodBasics'
  | 'foods'
  | 'fruits'
  | 'moreFruitsAndVegetables'
  | 'vegetables'
  | 'constructionMaterials'
  | 'constructionTools'
  | 'furniture'
  | 'house'
  | 'housing'
  | 'rooms'
  | 'head'
  | 'humanBodyBasics'
  | 'limbs'
  | 'organs'
  | 'senses'
  | 'earth'
  | 'natureBasics'
  | 'sea'
  | 'universe'
  | 'weather1'
  | 'weather2'
  | 'firstNumbers'
  | 'moreNumbers'
  | 'closeFamily'
  | 'humanBeings'
  | 'identity'
  | 'introduction'
  | 'buildings'
  | 'town'
  | 'transports'
  | 'days'
  | 'months'
  | 'timeBasics'
  | 'timeDescription1'
  | 'timeDescription2'
  | 'timeDivisions'
  | 'plants'
  | 'trees'
  | 'vegetalBasics';

export type Topic = 
  | 'animals'
  | 'clothes'
  | 'colors'
  | 'food'
  | 'habitation'
  | 'humanBody'
  | 'nature'
  | 'numbers'
  | 'socialLife'
  | 'society'
  | 'time'
  | 'vegetal';

export type Mutation = {
  /** update user stats after an exercise */
  updateStats?: Maybe<User>;
};


export type MutationUpdateStatsArgs = {
  results?: Maybe<Array<Maybe<FormResultInput>>>;
};

export type FormResultInput = {
  englishName: Scalars['String'];
  form?: Maybe<Forms>;
  isAnswerCorrect: Scalars['Boolean'];
  language: Languages;
};

export type FormStats = {
  language: Languages;
  form: Forms;
  score: Scalars['Float'];
};

export type Stats = {
  global: GlobalStats;
  lessons: LessonsScores;
  topics: Array<Maybe<TopicStats>>;
};

export type GlobalStats = {
  globalProgress: Scalars['Float'];
  goldLessons: Scalars['Int'];
  goldWords: Scalars['Int'];
  greenLessons: Scalars['Int'];
  greenWords: Scalars['Int'];
  studiedLessons: Scalars['Int'];
  studiedWords: Scalars['Int'];
};

/** LessonsScores associates a score to each lesson id */
export type LessonsScores = {
  animalsBasics?: Maybe<Scalars['Float']>;
  birds?: Maybe<Scalars['Float']>;
  farmAnimals?: Maybe<Scalars['Float']>;
  insects?: Maybe<Scalars['Float']>;
  mammals1?: Maybe<Scalars['Float']>;
  seaAnimals?: Maybe<Scalars['Float']>;
  accessories?: Maybe<Scalars['Float']>;
  clothesBasics?: Maybe<Scalars['Float']>;
  moreClothes?: Maybe<Scalars['Float']>;
  mainColors?: Maybe<Scalars['Float']>;
  agriculture?: Maybe<Scalars['Float']>;
  drinks?: Maybe<Scalars['Float']>;
  foodBasics?: Maybe<Scalars['Float']>;
  foods?: Maybe<Scalars['Float']>;
  fruits?: Maybe<Scalars['Float']>;
  moreFruitsAndVegetables?: Maybe<Scalars['Float']>;
  vegetables?: Maybe<Scalars['Float']>;
  constructionMaterials?: Maybe<Scalars['Float']>;
  constructionTools?: Maybe<Scalars['Float']>;
  furniture?: Maybe<Scalars['Float']>;
  house?: Maybe<Scalars['Float']>;
  housing?: Maybe<Scalars['Float']>;
  rooms?: Maybe<Scalars['Float']>;
  head?: Maybe<Scalars['Float']>;
  humanBodyBasics?: Maybe<Scalars['Float']>;
  limbs?: Maybe<Scalars['Float']>;
  organs?: Maybe<Scalars['Float']>;
  senses?: Maybe<Scalars['Float']>;
  earth?: Maybe<Scalars['Float']>;
  natureBasics?: Maybe<Scalars['Float']>;
  sea?: Maybe<Scalars['Float']>;
  universe?: Maybe<Scalars['Float']>;
  weather1?: Maybe<Scalars['Float']>;
  weather2?: Maybe<Scalars['Float']>;
  firstNumbers?: Maybe<Scalars['Float']>;
  moreNumbers?: Maybe<Scalars['Float']>;
  closeFamily?: Maybe<Scalars['Float']>;
  humanBeings?: Maybe<Scalars['Float']>;
  identity?: Maybe<Scalars['Float']>;
  introduction?: Maybe<Scalars['Float']>;
  buildings?: Maybe<Scalars['Float']>;
  town?: Maybe<Scalars['Float']>;
  transports?: Maybe<Scalars['Float']>;
  days?: Maybe<Scalars['Float']>;
  months?: Maybe<Scalars['Float']>;
  timeBasics?: Maybe<Scalars['Float']>;
  timeDescription1?: Maybe<Scalars['Float']>;
  timeDescription2?: Maybe<Scalars['Float']>;
  timeDivisions?: Maybe<Scalars['Float']>;
  plants?: Maybe<Scalars['Float']>;
  trees?: Maybe<Scalars['Float']>;
  vegetalBasics?: Maybe<Scalars['Float']>;
};

/** TopicsStats aggregates the lessons' stats, by topic */
export type TopicStats = {
  id: Scalars['String'];
  lessonsGrades: LessonsGrades;
};

export type LessonsGrades = {
  green: Scalars['Int'];
  gold: Scalars['Int'];
};

export type Query = {
  user: User;
  exercise?: Maybe<Array<Maybe<ExerciseWord>>>;
};


export type QueryExerciseArgs = {
  id: Lesson;
};

export type User = {
  id: Scalars['ID'];
  email: Scalars['String'];
  language?: Maybe<Languages>;
  stats: Stats;
};

export type GetUserLanguageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserLanguageQuery = { user: Pick<User, 'id' | 'language'> };


export const GetUserLanguageDocument = gql`
    query getUserLanguage {
  user {
    id
    language
  }
}
    `;

/**
 * __useGetUserLanguageQuery__
 *
 * To run a query within a React component, call `useGetUserLanguageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLanguageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLanguageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserLanguageQuery(baseOptions?: Apollo.QueryHookOptions<GetUserLanguageQuery, GetUserLanguageQueryVariables>) {
        return Apollo.useQuery<GetUserLanguageQuery, GetUserLanguageQueryVariables>(GetUserLanguageDocument, baseOptions);
      }
export function useGetUserLanguageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserLanguageQuery, GetUserLanguageQueryVariables>) {
          return Apollo.useLazyQuery<GetUserLanguageQuery, GetUserLanguageQueryVariables>(GetUserLanguageDocument, baseOptions);
        }
export type GetUserLanguageQueryHookResult = ReturnType<typeof useGetUserLanguageQuery>;
export type GetUserLanguageLazyQueryHookResult = ReturnType<typeof useGetUserLanguageLazyQuery>;
export type GetUserLanguageQueryResult = Apollo.QueryResult<GetUserLanguageQuery, GetUserLanguageQueryVariables>;