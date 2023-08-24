import { prisma } from '#config/db'
import { GraphQLError } from 'graphql'
import { type PaymentCreateType } from './dto/payment.create.dto'
import { type PaymentUpdateType } from './dto/payment.update.dto'
import { type PaymentEntityType } from './entities/payment.entity'
import { v4 as uuidv4 } from 'uuid'

const paymentModel = prisma.payment

export interface PaymentServiceType {
  allPayments: () => Promise<PaymentEntityType[]>
  allPaymentsByUser: (userID: string) => Promise<PaymentEntityType[]>
  onePayment: (paymentID: string) => Promise<PaymentEntityType>
  paymentsByDateRange: (initialDate: Date, endDate: Date) => Promise<PaymentEntityType[]>
  paymentByExpirationDate: () => Promise<PaymentEntityType>
  registerPayment: (userID: string, paymentCreationInput: PaymentCreateType) => Promise<PaymentEntityType>
  modifyPayment: (paymentID: string, paymentUpdateInput: PaymentUpdateType) => Promise<PaymentEntityType>
}

class PaymentService implements PaymentServiceType {
  private static instance: PaymentService
  private readonly recurrence = {
    yearly: 'yearly',
    monthly: 'monthly'
  }

  private constructor () {}

  public static getInstance (): PaymentService {
    if (PaymentService.instance == null) {
      PaymentService.instance = new PaymentService()
    }

    return PaymentService.instance
  }

  async allPayments (): Promise<any> {
    return await paymentModel.findMany({
      include: { user: true }
    })
  }

  async allPaymentsByUser (userID: string): Promise<any> {
    return await paymentModel.findMany({
      where: { userID },
      include: { user: true }
    })
  }

  async onePayment (paymentID: string): Promise<any> {
    return await paymentModel.findUnique({
      where: { id: paymentID },
      include: { user: true }
    })
  }

  async paymentsByDateRange (initialDate: Date, endDate: Date): Promise<any> {
    const newInitialDate = new Date(initialDate)
    const newEndDate = new Date(endDate)
    return await paymentModel.findMany({
      where: {
        AND: [
          { creation_date: { gte: newInitialDate } },
          { creation_date: { lte: newEndDate } }
        ]
      },
      include: { user: true }
    })
  }

  async paymentByExpirationDate (): Promise<any> {
    const currentDate = new Date()
    return await paymentModel.findFirst({
      where: { expiration_date: { gt: currentDate } },
      include: { user: true }
    })
  }

  async registerPayment (userID: string, paymentCreationInput: PaymentCreateType): Promise<any> {
    const creationDate = new Date()
    paymentCreationInput.creation_date = creationDate
    paymentCreationInput.id = uuidv4()
    const existPeriod = Object.keys(this.recurrence).includes(paymentCreationInput.period)
    if (!existPeriod) throw new GraphQLError('Period is not valid !!')
    if (paymentCreationInput.period === this.recurrence.yearly) {
      const expirationYear = creationDate.getFullYear() + 1
      const expirationMoth = creationDate.getUTCMonth()
      const expirationDay = creationDate.getDate()
      const expirationDate = new Date(expirationYear, expirationMoth, expirationDay)
      paymentCreationInput.expiration_date = expirationDate
    }
    if (paymentCreationInput.period === this.recurrence.monthly) {
      const expirationYear = creationDate.getFullYear()
      const expirationMoth = creationDate.getUTCMonth() + 1
      const expirationDay = creationDate.getDate()
      const expirationDate = new Date(expirationYear, expirationMoth, expirationDay)
      paymentCreationInput.expiration_date = expirationDate
    }
    return await paymentModel.create({
      data: {
        ...paymentCreationInput,
        user: { connect: { id: userID } }
      }
    })
  }

  async modifyPayment (paymentID: string, paymentUpdateInput: PaymentUpdateType): Promise<any> {
    const existPayment = await paymentModel.findUnique({
      where: { id: paymentID }
    })
    if (existPayment == null) throw new GraphQLError('Payment not exist!')
    if (paymentUpdateInput.description != null) {
      existPayment.description = paymentUpdateInput.description
    }
    return await paymentModel.update({
      where: { id: paymentID },
      data: { ...existPayment },
      include: { user: true }
    })
  }
}

export const paymentService = PaymentService.getInstance()
