import type { CodegenConfig } from "@graphql-codegen/cli";
import { GRAPHQL_API } from "./src/configs";

const config: CodegenConfig = {
  overwrite: true,
  schema: GRAPHQL_API,
  documents: ["./src/**/*.{gql, graphql}"],
  generates: {
    "./src/graphql-codegen/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
