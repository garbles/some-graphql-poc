import path from "path";
import { compile } from "../compile";

test("compiles a client.graphql", async () => {
  await compile({
    schema: "schema.graphql",
    cwd: path.join(__dirname, "__fixtures__"),
  });
});
