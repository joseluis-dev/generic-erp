export interface PaymentUpdateType {
  id: string
  method?: string
  amount?: number
  period?: string
  description?: string
  creation_date?: Date
  expiration_date?: Date
}
