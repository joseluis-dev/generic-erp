import { type ClientEntityType } from '#models/client/entities/client.entity'

export interface StatusEntityType {
  id: number
  code: string
  description: string
  client: ClientEntityType[]
}
