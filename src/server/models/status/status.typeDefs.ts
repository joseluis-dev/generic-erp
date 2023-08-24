export const statusTypeDefs = /* GraphQL */ `
  type Query {
    allStatus(secretPass: String!): [Status]!
  }

  type Mutation {
    addStatus(secretPass: String!, statusCreateInput: StatusCreateInput!): Status!
    modifyStatus(secretPass: String!, statusID: Int!, statusUpdateInput: StatusUpdateInput): Status!
    deleteStatus(secretPass: String!, statusID: Int!): Status!
  }

  type Status {
    id: Int!
    code: String!
    description: String!
  }

  input StatusCreateInput {
    code: String!
    description: String!
  }

  input StatusUpdateInput {
    code: String
    description: String
  }
`
