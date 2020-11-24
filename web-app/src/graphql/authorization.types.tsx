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

export type CreateWebUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateWebUserMutation = { createWebUser: Pick<MutationResult, 'success'> };

export type GetAccessTokenWebUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccessTokenWebUserQuery = { getAccessTokenWebUser: Pick<QueryResult, 'success'> };


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