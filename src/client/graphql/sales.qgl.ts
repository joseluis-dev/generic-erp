import { gql } from 'graphql-request'

export const mySales = gql`
  query mySales {
    mySales {
      id
      description
      total_cost
      status {
        id
        code
        description
      }
    }
  }
`
export const mySalesByStatus = gql`
  query mySalesByStatus($statusCode: String!) {
    mySalesByStatus (
      statusCode: $statusCode
    ) {
      id
      description
      total_cost
      sale_date
      client {
        id
        fullName
      }
    }
  }
`
export const mySale = gql`
  query oneSale($saleID: String!) {
    oneSale(saleID: $saleID) {
      id
      description
      total_cost
      status {
        id
        code
        description
      }
      client {
        id
        fullName
      }
      product {
        product {
          id
          name
          inventory {
            id
            cuantity
            location
          }
        }
        cuantity
        cost
      }
    }
  }
`
export const mySalesPaginatedQuery = gql`
  query mySalesPaginated($skip: Int!, $take: Int!) {
    mySalesPaginated(
      skip: $skip,
      take: $take
    ) {
      id
      description
      total_cost
      client {
        id
        fullName
      }
    }
  }
`

export const saleCountByPage = gql`
  query saleCountByPage($skip: Int!, $take: Int!) {
    saleCountByPage(
      skip: $skip,
      take: $take
    )
  }
`
export const mySalesByDate = gql`
  query mySalesByDate($initDate: DateTime!, $endDate: DateTime!) {
    mySalesByDate(
      initDate: $initDate
      endDate: $endDate
    ) {
      id
      description
      total_cost
      sale_date
      client {
        id
        fullName
      }
    }
  }
`
export const addSaleQuery = gql`
  mutation addSale($saleCreateInput: SaleCreateInput!) {
    addSale(
      saleCreateInput: $saleCreateInput
    ) {
      id
      description
      total_cost
    }
  }
`
export const modifySale = gql`
  mutation modifySale($saleID: String!, $saleUpdateInput: SaleUpdateInput!) {
    modifySale(
      saleID: $saleID
      saleUpdateInput: $saleUpdateInput
    ) {
      id
      description
      total_cost
      status {
        id
        code
        description
      }
    }
  }
`
export const deleteSale = gql`
  mutation deleteSale($saleID: String!) {
    deleteSale(
      saleID: $saleID
    ) {
      id
      description
      total_cost
    }
  }
`
export const modifyStatusSale = gql`
  mutation modifyStatusSale($saleID: String!, $statusCode: String!) {
    modifyStatusSale(
      saleID: $saleID
      statusCode: $statusCode
    ) {
      id
      description
      total_cost
      status {
        id
        code
        description
      }
    }
  }
`
