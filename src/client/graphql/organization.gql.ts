import { gql } from 'graphql-request'

export const myOrganizationQuery = gql`
  query myOrganizations {
    myOrganizations {
      id
      name
      brand_name
      identifier
      address
      email
      telephone
      creation_date
      update_by
      update_date
      image {
        id
        url
      }
    }
  }
`
export const currentOrganizationQuery = gql`
  query myOrganization {
    myOrganization {
      id
      name
      brand_name
      identifier
      telephone
      email
      address
      creation_date
      update_date
      update_by
      image {
        id
        url
        public_id
      }
    }
  }
`
export const loginOrganization = gql`
  mutation orgLogin($orgID: String!) {
    orgLogin (
      orgID: $orgID
    ) {
      jwt
    }
  }
`
export const joinUser = gql`
  mutation joinUsers($key: String!, $relationOrgUserInput: RelationOrgUserInput!) {
    joinUser(
      key: $key
      relationOrgUserInput: $relationOrgUserInput
    )
  }
`
export const addOrganization = gql`
  mutation addOrg(
    $name: String!
    $brand_name: String!
    $identifier: String!
    $telephone: String!
    $email: String!
    $address: String!
  ) {
  addOrganization(
    createOrgInput: {
      name: $name
      brand_name: $brand_name
      identifier: $identifier
      telephone: $telephone
      email: $email
      address: $address
    }
  ) {
    id
    name
    brand_name
    identifier
    telephone
    email
    address
    creation_date
    update_date
    update_by
    image {
      id
      url
      public_id
    }
  }
}
`
export const addOrgImage = gql`
  mutation addUserImage($file: File!) {
    addImage(
      file: $file
    ){
      id
      url
      public_id
    }
  }
`
export const modifyOrgQuery = gql`
  mutation modifyOrg($updateOrgInput: UpdateOrgInput!) {
    modifyOrganization(
      updateOrgInput: $updateOrgInput
    ) {
      id
      name
      brand_name
    }
  }
`
