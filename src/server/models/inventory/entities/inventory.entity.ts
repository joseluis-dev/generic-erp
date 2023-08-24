import { type ProductEntityType } from '#models/product/entities/product.entity'

export interface InventoryEntityType {
  id: string
  cuantity: number
  location?: string
  product: ProductEntityType
}
