import { type ProductToPurchaseEntityType } from '../entities/producttopurchase.entity'

export interface PurchaseUpdateType {
  id: string
  total_cost?: number
  description?: string
  providerID?: string
  detail?: ProductToPurchaseEntityType[]
  creation_date?: Date
  update_date?: Date
  update_by?: string
}
