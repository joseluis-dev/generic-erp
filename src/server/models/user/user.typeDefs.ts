export const userTypeDefs = /* GraphQL */ `
  type Query {
    allUsers(secretPass: String!): [User!]!
    oneUser(id: String!, secretPass: String!): User
    myUsers(orgID: String!): [User!]!
    myUsersWithRol(orgID: String!): [UserWithRol!]!
    me: User!
  }

  type Mutation {
    login(userName: String!, password: String!): JWT!
    addUser(createUserInput: CreateUserInput!): User!
    modifyUser(userID: String!, updateUserInput: UpdateUserInput!): User!
    modifyRole(userID: String!, rol: Rol!): String!
    deleteUser(userID: String!): User!
  }

  type User {
    id: String!
    fullName: String!
    idNumber: String
    email: String!
    userName: String!
    password: String!
    creation_date: DateTime!
    update_date: DateTime
    update_by: String
    organization: [OrgArray!]
    image: ProfileImage
  }

  type UserWithRol {
    userID: String!
    orgID: String!
    rol: Rol!
    user: User!
  }

  type JWT {
    jwt: String!
  }

  type OrgArray {
    organization: Org!
    rol: Rol
  }

  input CreateUserInput {
    fullName: String!
    idNumber: String
    email: String!
    userName: String!
    password: String!
  }

  input UpdateUserInput {
    fullName: String
    idNumber: String
    email: String
    userName: String
    password: String
  }

  enum Rol {
    NORMAL
    ADMIN
    MASTER
  }
`
