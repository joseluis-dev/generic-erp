import { type ClientEntityType } from '#models/client/entities/client.entity'
import { type ProfileImageEntityType } from '#models/profile_image/entities/profile_image.entity'
import { type UserEntityType } from '#models/user/entities/user.entity'

export interface OrganizationEntityType {
  id: string
  name: string
  brand_name: string
  identifier: string
  password: string
  telephone: string
  email: string
  address?: string | null
  creation_date: Date
  update_date?: Date | null
  update_by?: Date | null
  user?: UserEntityType[]
  client?: ClientEntityType[]
  image?: ProfileImageEntityType
}
