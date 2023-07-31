## Huh?

POC for a GraphQL codegen wrapper that requires no configuration and **does not generate user-land types or code** so nothing needs to be checked in. Like Prisma for React + Apollo.

1. Write all of your queries in `sdk.graphql`
2. Run `generate-some-graphql-sdk <schema-url>`
3. Use generated code

## Demo

See `packages/demo`

```graphql
# sdk.graphql

fragment BookDetails on Book {
  id
  title
  author {
    id
    name
  }
}

query GetAuthor($id: ID!) {
  author(id: $id) {
    id
    books {
      id
      title
    }
  }
}

query GetBook($id: ID!) {
  book(id: $id) {
    ...BookDetails
  }
}

mutation AddBook($book: BookInput!) {
  addBook(book: $book) {
    ...BookDetails
  }
}
```

```tsx
// src/App.tsx

// this is the NPM package that runs `generate-some-graphql-sdk`
import { sdk } from "some-graphql-cli";

const App = () => {
  // full typed client.
  const { data } = sdk.useGetBookQuery({ variables: { id: "1" } });

  // whatever...
};
```
