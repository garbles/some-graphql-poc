import path from "path";
import os from "os";
import fs from "fs";
import * as tsup from "tsup";
import { generate, CodegenConfig } from "@graphql-codegen/cli";

type Options = {
  schema: CodegenConfig["schema"];
  cwd: string;
  write: boolean;
};

export const compile = async (
  options: Partial<Options> = {}
): Promise<string> => {
  const { schema, cwd = process.cwd(), write = true } = options;

  const timestamp = Date.now();
  const out = path.join(__dirname, `temp/${timestamp}`, `sdk.ts`);

  const result = await generate(
    {
      schema,
      cwd,
      documents: "sdk.graphql",
      generates: {
        [out]: {
          plugins: [
            "typescript",
            "typescript-operations",
            "some-graphql-plugin",
          ],
          config: {},
        },
      },
    },
    write
  );

  if (write) {
    await tsup.build({
      entryPoints: [out],
      outDir: path.join(__dirname, "out"),
      format: ["cjs", "esm"],
      sourcemap: true,
      clean: true,
      dts: true,
    });

    fs.unlinkSync(out);
  }

  return result[0].content;
};
