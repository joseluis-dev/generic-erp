export interface UserCreateDTO {
  id: string
  fullName: string
  idNumber?: string | null
  email: string
  userName: string
  password: string
  creation_date: Date
  update_date?: Date | null
  update_by?: string | null
}
