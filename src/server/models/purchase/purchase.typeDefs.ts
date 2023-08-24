export const purchaseDefTypes = /* GraphQL */`
  type Query {
    myPurchases: [Purchase!]!
    myPurchasesPaginated(skip: Int!, take: Int!):
    [Purchase!]!
    onePurchase(purchaseID: String!): Purchase
    purchaseCountByPage(skip: Int!, take: Int!): Int!
    myPurchasesFiltered(filter: PurchaseFilter!): [Purchase!]!
    countPurchasesByStatus(statusCode: String!): Int!
  }

  type Mutation {
    addPurchase(purchaseCreateInput: PurchaseCreateInput!): Purchase!
    modifyPurchase(purchaseID: String!, purchaseUpdateInput: PurchaseUpdateInput!): Purchase!
    deletePurchase(purchaseID: String!): Purchase!
    modifyPurchaseStatus(purchaseID: String!, statusCode: String!): Purchase!
  }

  type Purchase {
    id: String!
    total_cost: Float!
    description: String
    status: Status!
    provider: Provider!
    detail: [PurchaseDetailArray!]!
    creation_date: DateTime!
    update_date: DateTime
    update_by: String
  }

  type PurchaseDetailArray {
    product: Product!
    cuantity: Float!
    cost: Float!
  }

  input PurchaseCreateInput {
    total_cost: Float!
    description: String
    providerID: String!
    detail: [PurchaseDetail!]!
  }

  input PurchaseUpdateInput {
    total_cost: Float
    description: String
    providerID: String
    detail: [PurchaseDetail!]
  }

  input PurchaseFilter {
    id: String
    cuantity: Float
    total_cost: Float
    description: String
    providerID: String
    creation_date: DateTime
    update_date: DateTime
    update_by: String
  }

  input PurchaseDetail {
    productID: String!
    cuantity: Int!
    cost: Float!
  }
`
