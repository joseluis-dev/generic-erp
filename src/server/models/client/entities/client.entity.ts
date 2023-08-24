import { type OrganizationEntityType } from '#models/organization/entities/organization.entity'

export interface ClientEntityType {
  id: string
  fullName: string
  email?: string
  address?: string
  telephone: string
  creation_date: Date
  organization?: OrganizationEntityType
}
