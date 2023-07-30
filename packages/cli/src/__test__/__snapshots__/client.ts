import { gql, useQuery, useMutation } from "@apollo/client";
import type { QueryOptions, MutationHookOptions } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  books: Array<Book>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type BookInput = {
  authorId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
};


export type MutationAddBookArgs = {
  book: BookInput;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors: Array<Author>;
  book?: Maybe<Book>;
  books: Array<Maybe<Book>>;
};


export type QueryAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookArgs = {
  id: Scalars['ID']['input'];
};

export type BookDetailsFragment = { __typename?: 'Book', id: string, title?: string | null, author: { __typename?: 'Author', id: string, name?: string | null } };

export type GetAuthorQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAuthorQuery = { __typename?: 'Query', author?: { __typename?: 'Author', id: string, books: Array<{ __typename?: 'Book', id: string, title?: string | null }> } | null };

export type GetBookQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: string, title?: string | null, author: { __typename?: 'Author', id: string, name?: string | null } } | null };

export type AddBookMutationVariables = Exact<{
  book: BookInput;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', id: string, title?: string | null, author: { __typename?: 'Author', id: string, name?: string | null } } };

export const BookDetailsFragmentDoc = gql`
    fragment BookDetails on Book {
  id
  title
  author {
    id
    name
  }
}
    `;
export const GetAuthorDocument = gql`
    query GetAuthor($id: ID!) {
  author(id: $id) {
    id
    books {
      id
      title
    }
  }
}
    `;
export const GetBookDocument = gql`
    query GetBook($id: ID!) {
  book(id: $id) {
    ...BookDetails
  }
}
    ${BookDetailsFragmentDoc}`;
export const AddBookDocument = gql`
    mutation AddBook($book: BookInput!) {
  addBook(book: $book) {
    ...BookDetails
  }
}
    ${BookDetailsFragmentDoc}`;
class SDK {
  useGetAuthorQuery(opts?: Partial<QueryOptions<GetAuthorQueryVariables>>) {
    return useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, opts);
  }
  useGetBookQuery(opts?: Partial<QueryOptions<GetBookQueryVariables>>) {
    return useQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, opts);
  }
  useAddBookMutation(opts?: MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
    return useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, opts);
  }
}

export const sdk = new SDK();