export interface OrganizationUpdateDTO {
  name?: string
  brand_name?: string
  identifier?: string
  password?: string
  telephone?: string
  email?: string
  address?: string | null
  update_date?: Date | null
}
