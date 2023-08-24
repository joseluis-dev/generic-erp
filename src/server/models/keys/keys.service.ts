import { prisma } from '#config/db'
import { type Rol } from '#models/user/entities/user.entity'
import { randomBytes } from 'crypto'
import { GraphQLError } from 'graphql'
import { type KeyCreateType } from './dto/keys.create.dto'
import { type KeyUpdateType } from './dto/keys.update.dto'
import { type KeyEntityType } from './entities/keys.entity'

const keysModel = prisma.keys

export interface KeysServiceType {
  allKeys: () => Promise<KeyEntityType[]>
  oneKey: (key: string) => Promise<KeyEntityType | null>
  generateKey: (orgID: string, rol: Rol) => Promise<KeyEntityType>
  deleteKey: (keyID: number) => Promise<KeyEntityType>
}

class KeysService implements KeysService {
  private static instance: KeysService
  private constructor () {}

  public static getInstance (): KeysService {
    if (KeysService.instance == null) {
      KeysService.instance = new KeysService()
    }

    return KeysService.instance
  }

  async allKeys (): Promise<KeyEntityType[]> {
    return await keysModel.findMany()
  }

  async oneKey (keyID: number): Promise<KeyEntityType | null> {
    return await keysModel.findUnique({
      where: { id: keyID }
    })
  }

  async keyByValue (key: string): Promise<KeyEntityType | null> {
    return await keysModel.findUnique({
      where: { key }
    })
  }

  async generateKey (orgID: string, rol: Rol): Promise<KeyEntityType> {
    const randomKey = randomBytes(32).toString('hex')
    const rolBuffer = Buffer.from(rol)
    const base64Rol = rolBuffer.toString('base64')
    const key = randomKey.concat(`.${orgID}`, `.${base64Rol}`)
    const keyToCreate: KeyCreateType = {
      key,
      creation_date: new Date(),
      orgID
    }
    return await keysModel.create({
      data: { ...keyToCreate }
    })
  }

  async updateKey (key: string, keyEntity: KeyUpdateType): Promise<KeyEntityType> {
    return await keysModel.update({
      data: { ...keyEntity },
      where: { key }
    })
  }

  async deleteKey (key: string): Promise<KeyEntityType> {
    const existKey = await keysModel.findUnique({
      where: { key }
    })
    if (existKey == null) throw new GraphQLError('La Key no existe!')
    return await keysModel.delete({
      where: { key }
    })
  }
}

export const keysService = KeysService.getInstance()
