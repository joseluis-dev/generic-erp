import { type ClientEntityType } from '#models/client/entities/client.entity'
import { type OrganizationEntityType } from '#models/organization/entities/organization.entity'

export interface ProductEntityType {
  id: string
  code: string
  name: string
  cost: number
  description?: string
  creation_date: Date
  update_date?: Date
  update_by: string
  status: string
  client?: ClientEntityType[]
  organization: OrganizationEntityType
}
