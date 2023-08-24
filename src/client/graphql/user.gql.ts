import { gql } from 'graphql-request'

export const userLoginQuery = gql`
  mutation userLogin($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      jwt
    }
  }
`
export const userMeQuery = gql`
  query me {
    me{
      id
      fullName
      email
      userName
      idNumber
      image {
        id
        url
        public_id
      }
    }
  }
`
export const myUsers = gql`
  query myUsers($orgID: String!) {
    myUsers(
      orgID: $orgID
    ){
      id
      fullName
      idNumber
      email
      userName
      image {
        id
        url
        public_id
      }
      organization {
        organization {
          id
        }
        rol
      }
    }
  }
`
export const myUsersWithRol = gql`
  query myUsersWithRol($orgID: String!) {
    myUsersWithRol(
      orgID: $orgID
    ) {
      userID
      orgID
      rol
      user {
        id
        fullName
        idNumber
        email
        userName
        image {
          id
          url
          public_id
        }
      }
    }
  }
`
export const userAddQuery = gql`
  mutation addUser (
    $fullName: String!,
    $email: String!,
    $userName: String!,
    $password: String!
  ) {
    addUser(
      createUserInput: {
        fullName: $fullName
        email: $email
        userName: $userName
        password: $password
      }
    ) {
      id
      fullName
      email
      userName
    }
  }
`
export const modifyRol = gql`
  mutation modifyRol($userID: String!, $rol: Rol!) {
    modifyRole(
      userID: $userID
      rol: $rol
    )
  }
`
export const generateUserKey = gql`
  mutation generateKey($rol: Rol!) {
    generateKeyByOrg(
      rol: $rol
    ){
      id
      key
      creation_date
    }
  }
`
export const removeUserQuery = gql`
  mutation removeUser($userID: String!) {
    removeUser (
      userID: $userID
    )
  }
`
export const modifyUserQuery = gql`
  mutation modifyUser(
    $userID: String!
    $updateUserInput: UpdateUserInput!
  ) {
    modifyUser (
      userID: $userID,
      updateUserInput: $updateUserInput
    ) {
      id
      fullName
      idNumber
      email
      userName
      image {
        id
        url
        public_id
      }
    }
  }
`
export const addUserImage = gql`
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
