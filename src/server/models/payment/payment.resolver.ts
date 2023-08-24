import { GraphQLError } from 'graphql'
import { paymentService } from './payment.service'

export const paymentQueryResolver = {
  async allPayments (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await paymentService.allPayments()
  },
  async allPaymentsByUser (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    const { userID } = args
    return await paymentService.allPaymentsByUser(userID)
  },
  async onePayment (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    const { paymentID } = args
    return await paymentService.onePayment(paymentID)
  },
  async paymentsByDateRange (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    const { initialDate, endDate } = args
    return await paymentService.paymentsByDateRange(initialDate, endDate)
  },
  async paymentByExpirationDate (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await paymentService.paymentByExpirationDate()
  },
  async hasUserPayment (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    if (currentUser == null) return false
    if (currentUser.payment.length > 0) return true
    else return false
  }
}

export const paymentMutationResolver = {
  async registerPayment (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    console.log(currentUser)
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { userID, paymentCreationInput } = args
    return await paymentService.registerPayment(userID, paymentCreationInput)
  },
  async modifyPayment (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    const { paymentID, paymentUpdateInput } = args
    return await paymentService.modifyPayment(paymentID, paymentUpdateInput)
  }
}
