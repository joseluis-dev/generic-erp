export const providerDefTypes = /* GraphQL */`
  type Query {
    myProviders: [Provider!]!
    myProvidersPaginated(skip: Int!, take: Int!):
    [Provider!]!
    oneProvider(providerID: String!): Provider
    providerCountByPage(skip: Int!, take: Int!): Int!
    myProvidersFiltered(filter: ProviderFilter!): [Provider!]!
    countProvidersByStatus(statusCode: String!): Int!
  }

  type Mutation {
    addProvider(providerCreateInput: ProviderCreateInput!): Provider!
    modifyProvider(providerID: String!, providerUpdateInput: ProviderUpdateInput!): Provider!
    deleteProvider(providerID: String!): Provider!
    modifyProviderStatus(providerID: String!, statusCode: String!): Provider!
  }

  type Provider {
    id: String!
    name: String!
    ruc: String!
    bank_account: String
    email: String!
    telephone: String
    description: String
    creation_date: DateTime!
    update_date: DateTime
    update_by: String
    status: Status!
  }

  input ProviderCreateInput {
    name: String!
    ruc: String!
    bank_account: String
    email: String!
    telephone: String
    description: String
  }

  input ProviderUpdateInput {
    name: String
    ruc: String
    bank_account: String
    email: String
    telephone: String
    description: String
  }

  input ProviderFilter {
    id: String
    name: String
    ruc: String
    bank_account: String
    email: String
    telephone: String
    description: String
    creation_date: DateTime
    update_date: DateTime
    update_by: String
    status: String
  }
`
