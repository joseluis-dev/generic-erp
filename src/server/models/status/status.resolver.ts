import { GraphQLError } from 'graphql'
import { statusService } from './status.service'

export const statusQueryResolver = {
  async allStatus (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass == null) throw new GraphQLError('Usuario no Autorizado')
    return await statusService.allStatus()
  }
}

export const statusMutationResolver = {
  async addStatus (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass == null) throw new GraphQLError('Usuario no Autorizado')
    const { statusCreateInput } = args
    return await statusService.addStatus(statusCreateInput)
  },
  async modifyStatus (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass == null) throw new GraphQLError('Usuario no Autorizado')
    const { statusID, statusUpdateInput } = args
    return await statusService.modifyStatus(statusID, statusUpdateInput)
  },
  async deleteStatus (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass == null) throw new GraphQLError('Usuario no Autorizado')
    const { statusID } = args
    return await statusService.deleteStatus(statusID)
  }
}
