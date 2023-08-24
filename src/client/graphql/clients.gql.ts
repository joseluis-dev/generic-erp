import { gql } from 'graphql-request'

export const myClients = gql`
  query myClients {
    myClients {
      id
      fullName
      idNumber
      email
      address
      telephone
      status {
        id
        code
        description
      }
    }
  }
`
export const myClient = gql`
  query myClient($clientID: String!) {
    oneClient(
      clientID: $clientID
    ){
      id
      fullName
      idNumber
      email
      address
      telephone
      status {
        id
        code
        description
      }
    }
  }
`
export const myClientsPaginatedQuery = gql`
  query myClientsPaginated($skip: Int, $take: Int) {
    myClientsPaginated(
      skip: $skip
      take: $take
    ){
      id
      fullName
      idNumber
      email
      address
      telephone
    }
  }
`
export const myClientsCountByPage = gql`
  query clientCountByPage($skip: Int, $take: Int) {
    clientCountByPage(
      skip: $skip
      take: $take
    )
  }
`
export const myClientsFiltered = gql`
  query myClientsFiltered($filter: ClientFilter!) {
    myClientsFiltered(
      filter: $filter
    ){
      id
      fullName
      idNumber
      email
      address
      telephone
      status {
        id
        code
      }
    }
  }
`
export const countClientsByStatus = gql`
  query countClientsByStatus($statusCode: String!) {
    countClientsByStatus(
      statusCode: $statusCode
    )
  }
`
export const addClientQuery = gql`
  mutation addClient($clientCreateInput: ClientCreateInput!) {
    addClient(
      clientCreateInput: $clientCreateInput
    ){
      id
      fullName
      idNumber
      email
      address
      telephone
    }
  }
`
export const modifyClient = gql`
  mutation modifyClient($clientID: String!, $clientUpdateInput: ClientUpdateInput!) {
    modifyClient(
      clientID: $clientID,
      clientUpdateInput: $clientUpdateInput
    ){
      id
      fullName
      idNumber
      email
      address
      telephone
      status {
        id
        code
        description
      }
    }
  }
`
