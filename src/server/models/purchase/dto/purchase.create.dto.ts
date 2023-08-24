import { type ProductToPurchaseEntityType } from '../entities/producttopurchase.entity'

export interface PurchaseCreateType {
  id: string
  total_cost: number
  description?: string
  providerID?: string
  detail: ProductToPurchaseEntityType[]
  creation_date: Date
}
