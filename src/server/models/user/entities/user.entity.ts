import { type OrganizationEntityType } from '#models/organization/entities/organization.entity'
import { type ProfileImageEntityType } from '#models/profile_image/entities/profile_image.entity'

export interface UserEntityType {
  id: string
  fullName: string
  idNumber?: string | null
  email: string
  userName: string
  password: string
  creation_date: Date
  update_date?: Date | null
  update_by?: string | null
  organization?: OrganizationEntityType[]
  image?: ProfileImageEntityType
}

export enum Rol {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER'
}
