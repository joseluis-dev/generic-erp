import { gql } from 'graphql-request'

export const hasUserPayment = gql`
  query hasUserPayment {
    hasUserPayment
  }
`
export const registerPayment = gql`
  mutation registerPayment($userID: String!, $paymentCreationInput: PaymentCreationInput!) {
    registerPayment(
      userID: $userID
      paymentCreationInput: $paymentCreationInput
    ) {
      id
      method
      amount
      description
      creation_date
      expiration_date
    }
  }
`
