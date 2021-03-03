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

export type LoginInput = {
  email: Scalars['String'];
  totp: Scalars['Int'];
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

export type Exercise = {
  id: Scalars['String'];
  type: Scalars['String'];
  words: Array<Maybe<ExerciseWord>>;
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

export type CurriculumNames = 
  | 'frenchEnglish';

export type ExerciseTypes = 
  | 'learn'
  | 'quiz'
  | 'review';

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
  email: Scalars['String'];
};


export type MutationSetLanguageArgs = {
  language: Languages;
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
  globalProgress: Scalars['Float'];
  goldLessons: Scalars['Int'];
  goldWords: Scalars['Int'];
  greenLessons: Scalars['Int'];
  greenWords: Scalars['Int'];
  studiedLessons: Scalars['Int'];
  studiedWords: Scalars['Int'];
};

export type LessonsGrades = {
  green: Scalars['Int'];
  gold: Scalars['Int'];
};

export type SetLanguageMutationResponse = {
  user?: Maybe<User>;
  success: Scalars['Boolean'];
};

export type Query = {
  user: User;
  getAccessTokenWebUser: QueryResult;
  exercise: Exercise;
};

export type User = {
  id: Scalars['ID'];
  email: Scalars['String'];
  language?: Maybe<Languages>;
  selectedCurriculumId: Scalars['String'];
  stats: Stats;
};

export type CreateWebUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateWebUserMutation = { createWebUser: Pick<MutationResult, 'success'> };

export type GetAccessTokenWebUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccessTokenWebUserQuery = { getAccessTokenWebUser: Pick<QueryResult, 'success'> };

export type GetNextExerciseQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNextExerciseQuery = { exercise: (
    Pick<Exercise, 'id' | 'type'>
    & { words: Array<Maybe<Pick<ExerciseWord, 'answers' | 'englishName' | 'form' | 'language' | 'lesson' | 'topic' | 'wordToTranslate'>>> }
  ) };

export type GetUserLanguageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserLanguageQuery = { user: Pick<User, 'id' | 'language'> };

export type SetLanguageMutationVariables = Exact<{
  language: Languages;
}>;


export type SetLanguageMutation = { setLanguage: (
    Pick<SetLanguageMutationResponse, 'success'>
    & { user?: Maybe<Pick<User, 'id' | 'language'>> }
  ) };


export const CreateWebUserDocument = gql`
    mutation createWebUser {
  createWebUser {
    success
  }
}
    `;
export type CreateWebUserMutationFn = Apollo.MutationFunction<CreateWebUserMutation, CreateWebUserMutationVariables>;

/**
 * __useCreateWebUserMutation__
 *
 * To run a mutation, you first call `useCreateWebUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebUserMutation, { data, loading, error }] = useCreateWebUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateWebUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateWebUserMutation, CreateWebUserMutationVariables>) {
        return Apollo.useMutation<CreateWebUserMutation, CreateWebUserMutationVariables>(CreateWebUserDocument, baseOptions);
      }
export type CreateWebUserMutationHookResult = ReturnType<typeof useCreateWebUserMutation>;
export type CreateWebUserMutationResult = Apollo.MutationResult<CreateWebUserMutation>;
export type CreateWebUserMutationOptions = Apollo.BaseMutationOptions<CreateWebUserMutation, CreateWebUserMutationVariables>;
export const GetAccessTokenWebUserDocument = gql`
    query getAccessTokenWebUser {
  getAccessTokenWebUser {
    success
  }
}
    `;

/**
 * __useGetAccessTokenWebUserQuery__
 *
 * To run a query within a React component, call `useGetAccessTokenWebUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccessTokenWebUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccessTokenWebUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccessTokenWebUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAccessTokenWebUserQuery, GetAccessTokenWebUserQueryVariables>) {
        return Apollo.useQuery<GetAccessTokenWebUserQuery, GetAccessTokenWebUserQueryVariables>(GetAccessTokenWebUserDocument, baseOptions);
      }
export function useGetAccessTokenWebUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccessTokenWebUserQuery, GetAccessTokenWebUserQueryVariables>) {
          return Apollo.useLazyQuery<GetAccessTokenWebUserQuery, GetAccessTokenWebUserQueryVariables>(GetAccessTokenWebUserDocument, baseOptions);
        }
export type GetAccessTokenWebUserQueryHookResult = ReturnType<typeof useGetAccessTokenWebUserQuery>;
export type GetAccessTokenWebUserLazyQueryHookResult = ReturnType<typeof useGetAccessTokenWebUserLazyQuery>;
export type GetAccessTokenWebUserQueryResult = Apollo.QueryResult<GetAccessTokenWebUserQuery, GetAccessTokenWebUserQueryVariables>;
export const GetNextExerciseDocument = gql`
    query GetNextExercise {
  exercise {
    id
    type
    words {
      answers
      englishName
      form
      language
      lesson
      topic
      wordToTranslate
    }
  }
}
    `;

/**
 * __useGetNextExerciseQuery__
 *
 * To run a query within a React component, call `useGetNextExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNextExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNextExerciseQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNextExerciseQuery(baseOptions?: Apollo.QueryHookOptions<GetNextExerciseQuery, GetNextExerciseQueryVariables>) {
        return Apollo.useQuery<GetNextExerciseQuery, GetNextExerciseQueryVariables>(GetNextExerciseDocument, baseOptions);
      }
export function useGetNextExerciseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNextExerciseQuery, GetNextExerciseQueryVariables>) {
          return Apollo.useLazyQuery<GetNextExerciseQuery, GetNextExerciseQueryVariables>(GetNextExerciseDocument, baseOptions);
        }
export type GetNextExerciseQueryHookResult = ReturnType<typeof useGetNextExerciseQuery>;
export type GetNextExerciseLazyQueryHookResult = ReturnType<typeof useGetNextExerciseLazyQuery>;
export type GetNextExerciseQueryResult = Apollo.QueryResult<GetNextExerciseQuery, GetNextExerciseQueryVariables>;
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
export const SetLanguageDocument = gql`
    mutation setLanguage($language: Languages!) {
  setLanguage(language: $language) {
    success
    user {
      id
      language
    }
  }
}
    `;
export type SetLanguageMutationFn = Apollo.MutationFunction<SetLanguageMutation, SetLanguageMutationVariables>;

/**
 * __useSetLanguageMutation__
 *
 * To run a mutation, you first call `useSetLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLanguageMutation, { data, loading, error }] = useSetLanguageMutation({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useSetLanguageMutation(baseOptions?: Apollo.MutationHookOptions<SetLanguageMutation, SetLanguageMutationVariables>) {
        return Apollo.useMutation<SetLanguageMutation, SetLanguageMutationVariables>(SetLanguageDocument, baseOptions);
      }
export type SetLanguageMutationHookResult = ReturnType<typeof useSetLanguageMutation>;
export type SetLanguageMutationResult = Apollo.MutationResult<SetLanguageMutation>;
export type SetLanguageMutationOptions = Apollo.BaseMutationOptions<SetLanguageMutation, SetLanguageMutationVariables>;