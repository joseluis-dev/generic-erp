export const saleTypeDefs = /* GraphQL */`
  type Query {
    mySales: [Sale!]!
    mySalesPaginated(skip: Int, take: Int): [Sale!]!
    oneSale(saleID: String!): Sale
    saleCountByPage(skip: Int, take: Int): Int!
    mySalesByStatus(statusCode: String!): [Sale!]!
    mySalesByDate(initDate: DateTime!, endDate: DateTime!): [Sale!]!
  }

  type Mutation {
    addSale(saleCreateInput: SaleCreateInput!): Sale!
    modifySale(saleID:String!, saleUpdateInput: SaleUpdateInput!): Sale!
    deleteSale(saleID: String!): Sale!
    modifyStatusSale(saleID: String!, statusCode: String!): Sale!
  }

  type Sale {
    id: String!
    description: String
    total_cost: Float!
    client: Client!
    sale_date: DateTime!
    organization: Org!
    product: [ProductArray!]!
    status: Status!
  }

  type ProductArray {
    product: Product!
    cuantity: Int!
    cost: Float!
  }

  input SaleCreateInput {
    description: String
    total_cost: Float!
    clientID: String!
    detail: [SaleDetail!]!
  }

  input SaleUpdateInput {
    description: String
    total_cost: Float
    detail: [SaleDetail!]
  }

  input SaleDetail {
    productID: String!
    cuantity: Int!
    cost: Float!
  }
`
