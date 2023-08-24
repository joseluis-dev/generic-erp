export const productTypeDefs = /* GraphQL */`
  type Query {
    myProducts: [Product!]!
    myProductsPaginated(skip: Int!, take: Int!): [Product!]!
    oneProduct(productID: String!): Product
    productCountByPage(skip: Int!, take: Int!): Int!
    myProductsFiltered(filter: ProductFilter!): [Product!]!
    countProductsByStatus(statusCode: String!): Int!
  }

  type Mutation {
    addProduct(productCreateInput: ProductCreateInput!, invLocation: String): Product!
    modifyProduct(productID: String!, productUpdateInput: ProductUpdateInput!, invLocation: String): Product!
    deleteProduct(productID: String!): Product!
    modifyProductStatus(productID: String!, statusCode: String!): Product!
  }

  type Product {
    id: String!
    code: String!
    name: String!
    cost: Float!
    description: String
    creation_date: DateTime!
    update_date: DateTime
    update_by: String
    status: Status!
    client: [Client!]!
    inventory: Inventory
  }

  input ProductCreateInput {
    code: String!
    name: String!
    cost: Float!
    description: String
  }

  input ProductUpdateInput {
    code: String!
    name: String
    cost: Float
    description: String
  }

  input ProductFilter {
    id: String
    code: String
    name: String
    cost: Float
    description: String
    creation_date: DateTime
    update_date: DateTime
    update_by: String
    status: String
  }
`
