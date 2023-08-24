import { validOrganization } from '#middlewares/validOrg.middleware'
import { GraphQLError } from 'graphql'
import { providerService } from './provider.service'

export const providerQueryResolver = {
  async myProviders (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    return await providerService.myProviders(currentOrg.id)
  },
  async myProvidersPaginated (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await providerService.myProvidersPaginated(currentOrg.id, skip, take)
  },
  async oneProvider (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { providerID } = args
    return await providerService.oneProvider(providerID)
  },
  async providerCountByPage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await providerService.providerCountByPage(currentOrg.id, skip, take)
  },
  async myProvidersFiltered (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { filter } = args
    return await providerService.myProvidersFiltered(filter, currentOrg.id)
  },
  async countProvidersByStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { statusCode } = args
    return await providerService.countProvidersByStatus(currentOrg.id, statusCode)
  }
}

export const providerMutationResolver = {
  async addProvider (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { providerCreateInput } = args
    return await providerService.addProvider(currentOrg.id, providerCreateInput)
  },
  async modifyProvider (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { providerID, providerUpdateInput } = args
    return await providerService.modifyProvider(providerID, providerUpdateInput)
  },
  async deleteProvider (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { providerID } = args
    return await providerService.deleteProvider(providerID)
  },
  async modifyProviderStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { providerID, statusCode } = args
    return await providerService.modifyProviderStatus(providerID, statusCode)
  }
}
