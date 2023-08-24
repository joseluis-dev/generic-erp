import { type ProductToSaleEntityType } from './productToSale.entity'

export interface SaleEntityType {
  id: string
  description?: string
  total_cost: number
  sale_date: Date
  clientID: string
  orgID: string
  statusID: string
  detail: ProductToSaleEntityType[]
}
