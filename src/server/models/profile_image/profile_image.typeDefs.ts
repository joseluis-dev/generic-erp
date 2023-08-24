export const profileImageTypeDefs = /* GraphQL */`
  scalar File

  type Query {
    allImages(secretPass: String!): [ProfileImage!]!
    oneImage(secretPass: String!, imgID: String!): ProfileImage
    myImage: ProfileImage
  }

  type Mutation {
    addImage(file: File!): ProfileImage!
    deleteImage(orgID: String, imgID: String!): ProfileImage!
  }

  type ProfileImage {
    id: String!
    url: String!
    public_id: String!
    creation_date: DateTime!
    update_date: DateTime
    update_by: String
    organization: Org
    user: User
  }
`
