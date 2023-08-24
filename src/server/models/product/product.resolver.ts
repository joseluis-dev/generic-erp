import { validOrganization } from '#middlewares/validOrg.middleware'
import { GraphQLError } from 'graphql'
import { productService } from './product.service'

export const productQueryResolver = {
  async myProducts (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    return await productService.myProducts(currentOrg.id)
  },
  async myProductsPaginated (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await productService.myProductsPaginated(currentOrg.id, skip, take)
  },
  async oneProduct (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { productID } = args
    return await productService.oneProduct(productID)
  },
  async productCountByPage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { skip, take } = args
    return await productService.productCountByPage(currentOrg.id, skip, take)
  },
  async myProductsFiltered (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { filter } = args
    return await productService.myProductsFiltered(filter, currentOrg.id)
  },
  async countProductsByStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { statusCode } = args
    return await productService.countProductsByStatus(currentOrg.id, statusCode)
  }
}

export const productMutationResolver = {
  async addProduct (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { productCreateInput, invLocation } = args
    return await productService.addProduct(currentOrg.id, productCreateInput, invLocation)
  },
  async modifyProduct (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { productID, productUpdateInput, invLocation } = args
    return await productService.modifyProduct(productID, productUpdateInput, invLocation)
  },
  async deleteProduct (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { productID } = args
    return await productService.deleteProduct(productID)
  },
  async modifyProductStatus (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { productID, statusCode } = args
    return await productService.modifyProductStatus(productID, statusCode)
  }
}
