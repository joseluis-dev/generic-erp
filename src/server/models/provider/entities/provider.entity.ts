import { type StatusEntityType } from '#models/status/entities/status.entity'

export interface ProviderEntityType {
  id: string
  name: string
  ruc: string
  bank_account?: string
  email: string
  telephone: string
  description?: string
  creation_date: Date
  update_date?: Date
  update_by: string
  status: StatusEntityType
}
