import { validOrganization } from '#middlewares/validOrg.middleware'
import { GraphQLError } from 'graphql'
import { purchaseService } from './purchase.service'

export const purchaseQueryResolver = {
  async myPurchases (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    return await purchaseService.myPurchases(currentOrg.id)
  },
  async myPurchasesPaginated (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await purchaseService.myPurchasesPaginated(currentOrg.id, skip, take)
  },
  async onePurchase (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { purchaseID } = args
    return await purchaseService.onePurchase(purchaseID)
  },
  async purchaseCountByPage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await purchaseService.purchaseCountByPage(currentOrg.id, skip, take)
  },
  async myPurchasesFiltered (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { filter } = args
    return await purchaseService.myPurchasesFiltered(filter, currentOrg.id)
  },
  async countPurchasesByStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { statusCode } = args
    return await purchaseService.countPurchasesByStatus(currentOrg.id, statusCode)
  }
}

export const purchaseMutationResolver = {
  async addPurchase (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { purchaseCreateInput } = args
    return await purchaseService.addPurchase(currentOrg.id, purchaseCreateInput)
  },
  async modifyPurchase (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { purchaseID, purchaseUpdateInput } = args
    return await purchaseService.modifyPurchase(purchaseID, purchaseUpdateInput)
  },
  async deletePurchase (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { purchaseID } = args
    return await purchaseService.deletePurchase(purchaseID)
  },
  async modifyPurchaseStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { purchaseID, statusCode } = args
    return await purchaseService.modifyPurchaseStatus(purchaseID, statusCode)
  }
}
