export interface PurchaseFilterType {
  id: string
  total_cost?: number
  description?: string
  creation_date?: Date
  update_date: Date
  update_by?: string
  status?: string
  providerID?: string
  productID?: string
}
