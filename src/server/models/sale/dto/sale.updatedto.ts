import { type ProductToSaleEntityType } from '../entities/productToSale.entity'

export interface SaleUpdateType {
  id: string
  description?: string
  total_cost?: number
  sale_date?: Date
  detail?: ProductToSaleEntityType[]
}
