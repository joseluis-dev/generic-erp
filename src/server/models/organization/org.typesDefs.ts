export const orgTypeDefs = /* GraphQL */ `
  type Query {
    allOrgs(secretPass: String!): [Org!]!
    oneOrg(orgID: String!, secretPass: String!): Org
    myOrganizations: [Org!]!
    myOrganization: Org
  }

  type Mutation {
    orgLogin(orgID: String!): JWT!
    addOrganization(createOrgInput: CreateOrgInput!): Org!
    modifyOrganization(updateOrgInput: UpdateOrgInput!): Org!
    deleteOrganization: Org!
    joinUser(key: String!, relationOrgUserInput: RelationOrgUserInput!): Response!
    removeUser(userID: String!): Response!
  }

  type Org {
    id: String!
    name: String!
    brand_name: String!
    identifier: String!
    telephone: String!
    email: String!
    address: String
    creation_date: DateTime!
    update_date: DateTime
    update_by: String
    user: [UserArray!]!
    client: Client
    image: ProfileImage
  }

  type UserArray {
    user: User!
  }

  enum Response {
    SUCCESS
    FAIL
  }

  input CreateOrgInput {
    name: String!
    brand_name: String!
    identifier: String!
    telephone: String!
    email: String!
    address: String
  }

  input UpdateOrgInput {
    name: String
    brand_name: String
    identifier: String
    telephone: String
    email: String
    address: String
  }

  input RelationOrgUserInput {
    userID: String!
    orgID: String!
    rol: Rol
  }
`
