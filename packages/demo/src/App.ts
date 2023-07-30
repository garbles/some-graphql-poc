import { sdk } from "some-graphql-cli";

const App = () => {
  const { data } = sdk.useGetBookQuery({ variables: { id: "1" } });

  return null;
};
