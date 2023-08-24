export const clientTypeDefs = /* GraphQL */`
  type Query {
    myClients: [Client!]!
    myClientsPaginated(skip: Int, take: Int): [Client!]!
    oneClient(clientID: String!): Client
    clientCountByPage(skip: Int, take: Int): Int!
    myClientsFiltered(filter: ClientFilter!): [Client!]!
    countClientsByStatus(statusCode: String!): Int!
  }

  type Mutation {
    addClient(clientCreateInput: ClientCreateInput!): Client!
    modifyClient(clientID:String!, clientUpdateInput: ClientUpdateInput!): Client!
    deleteClient(clientID: String!): Client!
    modifyStatusClient(clientID: String!, statusCode: String!): Client!
  }

  type Client {
    id: String!
    fullName: String!
    idNumber: String
    email: String
    address: String
    telephone: String!
    organization: Org!
    status: Status!
  }

  input ClientCreateInput {
    fullName: String!
    idNumber: String
    email: String
    address: String
    telephone: String!
  }

  input ClientUpdateInput {
    fullName: String
    idNumber: String
    email: String
    address: String
    telephone: String
  }

  input ClientFilter {
    id: String
    fullName: String
    idNumber: String
    email: String
    address: String
    telephone: String
    status: String
  }
`
