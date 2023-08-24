import { type ProductToSaleEntityType } from '../entities/productToSale.entity'

export interface SaleCreateType {
  id: string
  description?: string
  total_cost: number
  sale_date: Date
  clientID: string
  orgID: string
  detail: ProductToSaleEntityType[]
}
