import { generate, CodegenConfig } from "@graphql-codegen/cli";

type Options = {
  schema: CodegenConfig["schema"];
  cwd: string;
};

export const compile = async (options: Partial<Options> = {}) => {
  const { schema, cwd = process.cwd() } = options;

  console.log(cwd);

  const result = await generate(
    {
      schema,
      cwd,
      documents: "client.graphql",
      generates: {
        "./client.ts": {
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-react-apollo",
          ],
        },
      },
    }
    // false
  );

  console.log("result:", result);
};
