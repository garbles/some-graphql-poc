import path from "path";
import { compile } from "../compile";

test("compiles a client.graphql", async () => {
  const result = await compile({
    schema: "schema.graphql",
    cwd: path.join(__dirname, "__fixtures__"),
  });

  expect(result).toMatchFileSnapshot("__snapshots__/client.ts");
});
