export const paymentDefTypes = /* GraphQL */`
  type Query {
    allPayments(secretPass: String!): [Payment!]!
    allPaymentsByUser(secretPass: String!, userID: String!,): [Payment!]!
    onePayment(secretPass: String!, paymentID: String!): Payment
    paymentsByDateRange(secretPass: String!, initialDate: DateTime!, endDate: DateTime!): [Payment!]!
    paymentByExpirationDate(secretPass: String!): Payment
    hasUserPayment: Boolean!
  }

  type Mutation {
    registerPayment(userID: String!, paymentCreationInput: PaymentCreationInput!): Payment
    modifyPayment(secretPass: String!, paymentID:String!, paymentUpdateInput: PaymentUpdateInput!): Payment!
  }

  type Payment {
    id: String!
    method: String!
    amount: Float!
    period: String!
    description: String!
    creation_date: DateTime!
    expiration_date: DateTime!
    user: User!
  }

  input PaymentCreationInput {
    method: String!
    amount: Float!
    period: String!
    description: String!
  }

  input PaymentUpdateInput {
    description: String
  }
`
