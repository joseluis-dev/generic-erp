export interface PurchaseEntityType {
  id: string
  cuantity: number
  total_cost: number
  description: string
  providerID: string
  productID: string
  creation_date: Date
  update_date?: Date
  update_by: string
}
