import { type ClientEntityType } from '#models/client/entities/client.entity'

export interface PaymentEntityType {
  id: string
  method: string
  amount: number
  period: string
  description: string
  creation_date: Date
  expiration_date: Date
  client: ClientEntityType
}
