export interface OrganizationCreateDTO {
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
}
