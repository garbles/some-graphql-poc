import { PluginFunction } from "@graphql-codegen/plugin-helpers";

export const plugin: PluginFunction<{}> = async (schema, documents) => {
  return {
    content: "",
    prepend: [],
  };
};
