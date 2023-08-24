export const myPurchases = /* GraphQL */`
  query myPurchases {
    myPurchases {
      id
      total_cost
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
      }
      provider {
        id
        name
      }
      detail {
        product {
          id
          code
        }
      }
    }
  }
`
export const myPurchasesPaginated = /* GraphQL */`
  query myPurchasesPaginated($skip: Int!, $take: Int!) {
    myPurchasesPaginated(
      skip: $skip
      take: $take
    ) {
      id
      total_cost
      description
      status {
        id
        code
      }
      provider {
        id
        name
      }
      detail {
        product {
          id
          code
        }
      }
      creation_date
      update_date
      update_by
    }
  }
`
export const myPurchase = /* GraphQL */`
  query onePurchase($purchaseID: String!) {
    onePurchase(
      purchaseID: $purchaseID
    ) {
      id
      total_cost
      description
      creation_date
      status {
        id
        code
      }
      provider {
        id
        name
      }
      detail {
        cost
        cuantity
        product {
          id
          code
          name
          cost
          inventory {
            id
            cuantity
            location
          }
        }
      }
      creation_date
      update_date
      update_by
    }
  }
`
export const purchaseCountByPage = /* GraphQL */`
  query purchaseCountByPage($skip: Int!, $take: Int!) {
    purchaseCountByPage(
      skip: $skip
      take: $take
    )
  }
`

export const countPurchasesByStatus = /* GraphQL */`
  query countPurchasesByStatus($statusCode: String!) {
    countPurchasesByStatus(
      statusCode: $statusCode
    )
  }
`
export const addPurchaseQuery = /* GraphQL */`
  mutation addPurchase($purchaseCreateInput: PurchaseCreateInput!) {
    addPurchase(
      purchaseCreateInput: $purchaseCreateInput
    ) {
      id
      total_cost
      description
      creation_date
      update_date
      update_by
    }
  }
`
export const modifyPurchase = /* GraphQL */`
  mutation modifyPurchase($purchaseID: String!, $purchaseUpdateInput: PurchaseUpdateInput!) {
    modifyPurchase(
      purchaseID: $purchaseID
      purchaseUpdateInput: $purchaseUpdateInput
    ){
      id
      total_cost
      description
      status {
        id
        code
      }
      provider {
        id
        name
      }
      creation_date
      update_date
      update_by
    }
  }
`
export const modifyPurchaseStatus = /* GraphQL */`
  mutation modifyPurchaseStatus($purchaseID: String!, $statusCode: String!) {
    modifyPurchaseStatus(
      purchaseID: $purchaseID
      statusCode: $statusCode
    ) {
      id
      total_cost
      description
      status {
        id
        code
      }
      provider {
        id
        name
      }
      creation_date
      update_date
      update_by
    }
  }
`
export const deletePurchase = /* GraphQL */`
  mutation deletePurchase($purchaseID: String!) {
    deletePurchase(
      purchaseID: $purchaseID
    ) {
      id
      total_cost
      description
      creation_date
      update_date
      update_by
    }
  }
`
