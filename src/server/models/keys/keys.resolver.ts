import { GraphQLError } from 'graphql'
import { keysService } from './keys.service'

export const keysQueryResolver = {
  async allKeys (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await keysService.allKeys()
  },
  async oneKey (root: any, args: any, context: any) {
    const { secretPass, keyID } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await keysService.oneKey(keyID)
  }
}

export const keysMutationResolver = {
  async generateKeyByOrg (root: any, args: any, context: any) {
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { organization } = currentUser
    const { rol } = args
    const hasOrganization = organization.some((org: any) => org.organization.id === currentOrg.id) as boolean
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    return await keysService.generateKey(currentOrg.id, rol)
  },
  async deleteKey (root: any, args: any, context: any) {
    const { secretPass, key } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await keysService.deleteKey(key)
  }
}
