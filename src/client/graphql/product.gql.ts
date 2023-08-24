import { gql } from 'graphql-request'

export const myProductsPaginatedQuery = gql`
  query myProductsPaginated($skip: Int!, $take: Int!) {
    myProductsPaginated(
      skip: $skip
      take: $take
    ) {
      id
      code
      name
      cost
      description
      creation_date
      update_date
      update_by
      inventory {
        id
        cuantity
        location
      }
    }
  }
`
export const productCountByPage = gql`
  query productCountByPage($skip: Int!, $take: Int!) {
    productCountByPage(
      skip: $skip
      take: $take
    )
  }
`
export const myProduct = gql`
  query oneProduct($productID: String!) {
    oneProduct(
      productID: $productID
    ){
      id
      code
      name
      cost
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
        description
      }
      inventory {
        id
        cuantity
        location
      }
    }
  }
`
export const myProducts = gql`
  query myProducts {
    myProducts {
      id
      code
      name
      cost
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
        description
      }
      inventory {
        id
        cuantity
        location
      }
    }
  }
`
export const myProductsFiltered = gql`
  query myProductsFiltered($filter: ProductFilter!) {
    myProductsFiltered(
      filter: $filter
    ){
      id
      code
      name
      cost
      description
      status {
        id
        code
      }
      inventory {
        id
        cuantity
        location
      }
    }
  }
`
export const countProductsByStatus = gql`
  query countProductsByStatus($statusCode: String!) {
    countProductsByStatus(
      statusCode: $statusCode
    )
  }
`
export const addProductQuery = gql`
  mutation addProduct($productCreateInput: ProductCreateInput!, $invLocation: String) {
    addProduct(
      productCreateInput: $productCreateInput
      invLocation: $invLocation
    ) {
      id
      code
      name
      cost
      description
    }
  }
`
export const modifyProduct = gql`
mutation modifyProduct($productID: String!, $productUpdateInput: ProductUpdateInput!, $invLocation: String) {
  modifyProduct(
    productID: $productID
    productUpdateInput: $productUpdateInput
    invLocation: $invLocation
  ) {
    id
    code
    name
    cost
    description
    creation_date
    update_date
    update_by
    status {
      id
      code
    }
    inventory {
        id
        cuantity
        location
      }
  }
}
`
