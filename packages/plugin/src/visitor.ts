import {
  ClientSideBaseVisitor,
  LoadedFragment,
} from "@graphql-codegen/visitor-plugin-common";
import { GraphQLSchema, OperationDefinitionNode } from "graphql";

type InternalOperation = {
  node: OperationDefinitionNode;
  documentVariableName: string;
  operationType: "Query" | "Mutation";
  operationResultType: string;
  operationVariablesTypes: string;
};

export class PluginVisitor extends ClientSideBaseVisitor {
  static prepend = [
    `import { gql, useQuery, useMutation } from "@apollo/client";`,
    `import type { QueryOptions, MutationHookOptions } from '@apollo/client';`,
  ].join("\n");

  #operations: InternalOperation[] = [];

  constructor(schema: GraphQLSchema, fragments: LoadedFragment[]) {
    super(schema, fragments, {}, {});
  }

  protected buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: "Query" | "Mutation",
    operationResultType: string,
    operationVariablesTypes: string
  ) {
    this.#operations.push({
      node,
      documentVariableName,
      operationType,
      operationResultType,
      operationVariablesTypes,
    });

    return "";
  }

  bundle() {
    return [
      `class SDK {`,
      this.#operations.map((op) => this.#buildMember(op)).join("\n"),
      `}\n`,
      `export const sdk = new SDK();`,
    ].join("\n");
  }

  #buildMember(operation: InternalOperation) {
    const hookName = this.#getHookName(operation.operationResultType);
    const baseHookName = this.#getBaseHookName(operation.operationType);
    const optionsType = this.#getOptionsType(operation);

    return [
      `  ${hookName}(opts?: ${optionsType}) {`,
      `    return ${baseHookName}<${operation.operationResultType}, ${operation.operationVariablesTypes}>(${operation.documentVariableName}, opts);`,
      `  }`,
    ].join("\n");
  }

  #getHookName(resultType: string) {
    return `use${resultType}`;
  }

  #getBaseHookName(operationType: "Query" | "Mutation") {
    return `use${operationType}`;
  }

  #getOptionsType(operation: InternalOperation) {
    if (operation.operationType === "Query") {
      return `Partial<QueryOptions<${operation.operationVariablesTypes}>>`;
    } else if (operation.operationType === "Mutation") {
      return `MutationHookOptions<${operation.operationResultType}, ${operation.operationVariablesTypes}>`;
    } else {
      `{}`;
    }
  }
}
