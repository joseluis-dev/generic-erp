import { type OrganizationEntityType } from '#models/organization/entities/organization.entity'
import { type UserEntityType } from '#models/user/entities/user.entity'

export interface ProfileImageEntityType {
  id: string
  url: string
  public_id: string
  creation_date: Date
  update_date?: Date
  update_by?: string
  organization?: OrganizationEntityType
  user?: UserEntityType
}

export interface FileInputType {
  blobParts: []
  type: string
  encodig: string
  name: string
  webkitRelativePath: string
  lastModified: bigint
}
