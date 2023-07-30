import { oldVisit, PluginFunction } from "@graphql-codegen/plugin-helpers";
import { LoadedFragment } from "@graphql-codegen/visitor-plugin-common";
import { concatAST, FragmentDefinitionNode, Kind } from "graphql";
import { PluginVisitor } from "./visitor";

export const plugin: PluginFunction<{}> = async (schema, documents) => {
  const allAst = concatAST(documents.map((v) => v.document!));

  const allFragments: LoadedFragment[] = allAst.definitions
    .filter(
      (node): node is FragmentDefinitionNode =>
        node.kind === Kind.FRAGMENT_DEFINITION
    )
    .map((node) => {
      return {
        node,
        isExternal: false,
        onType: node.typeCondition.name.value,
        name: node.name.value,
      };
    });

  const visitor = new PluginVisitor(schema, allFragments);
  const visitorResult: { definitions: string[] } = oldVisit(allAst, {
    leave: visitor as any,
  });

  return {
    prepend: [PluginVisitor.prepend],
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter((t) => typeof t === "string"),
      visitor.bundle(),
    ].join("\n"),
  };
};
