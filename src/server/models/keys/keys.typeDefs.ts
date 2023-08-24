export const keysTypeDefs = /* GraphQL */`
  type Query {
    allKeys(secretPass: String!): [Key!]!
    oneKey(keyID: Int!, secretPass: String!): Key
  }

  type Mutation {
    generateKeyByOrg(rol: Rol!): Key!
    deleteKey(key: String!, secretPass: String!): Key!
  }

  type Key {
    id: Int!
    key: String!
    creation_date: DateTime
  }
`
