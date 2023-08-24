import { validOrganization } from '#middlewares/validOrg.middleware'
import { GraphQLError } from 'graphql'
import { clientService } from './client.service'

export const clientQueryResolver = {
  async myClients (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    return await clientService.myClients(currentOrg.id)
  },
  async myClientsPaginated (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await clientService.myClientsPaginated(currentOrg.id, skip, take)
  },
  async oneClient (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { clientID } = args
    return await clientService.oneClient(clientID)
  },
  async clientCountByPage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await clientService.clientCountByPage(currentOrg.id, skip, take)
  },
  async myClientsFiltered (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { filter } = args
    return await clientService.myClientsFiltered(filter, currentOrg.id)
  },
  async countClientsByStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { statusCode } = args
    return await clientService.countClientsByStatus(currentOrg.id, statusCode)
  }
}

export const clientMutationResolver = {
  async addClient (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { clientCreateInput } = args
    return await clientService.addClient(currentOrg.id, clientCreateInput)
  },
  async modifyClient (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { clientID, clientUpdateInput } = args
    return await clientService.modifyClient(clientID, clientUpdateInput)
  },
  async deleteClient (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { clientID } = args
    return await clientService.deleteClient(clientID)
  },
  async modifyStatusClient (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { clientID, statusCode } = args
    return await clientService.modifyStatusClient(clientID, statusCode)
  }
}
