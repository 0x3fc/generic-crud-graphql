import { graphql, GraphQLSchema, Source } from "graphql";
import Maybe from "graphql/tsutils/Maybe";
import { createSchema } from "../../src/bootstrap/app";

interface Arguments {
  source: string | Source;
  variableValues?: Maybe<{ [key: string]: any }>;
  contextValue?: any;
}

let schema: GraphQLSchema;

export const call = async ({
  source,
  variableValues,
  contextValue,
}: Arguments) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue,
  });
};
