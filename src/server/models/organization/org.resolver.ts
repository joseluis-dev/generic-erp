import { organizationService } from './org.service'
import { GraphQLError } from 'graphql'
import { keysService } from '#models/keys/keys.service'
import { validOrganization } from '#middlewares/validOrg.middleware'

// QUERY
export const organizationQueryResolver = {
  async allOrgs (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await organizationService.findAll()
  },
  async oneOrg (root: any, args: any, context: any) {
    const { secretPass, orgID } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await organizationService.findOne(orgID)
  },
  async myOrganizations (root: any, args: any, context: any) {
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { id } = currentUser
    return await organizationService.myOrganizations(id)
  },
  async myOrganization (root: any, args: any, context: any) {
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    if (currentOrg == null) throw new GraphQLError('Debe Seleccionar una Organzación')
    return currentOrg
  }
}

// MUTATION
export const organizationMutationResolver = {
  async orgLogin (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization({ id: args.orgID }, currentUser, ['MASTER', 'ADMIN', 'NORMAL'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { orgID } = args
    return await organizationService.orgLogin(orgID)
  },
  async addOrganization (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const userID = currentUser.id
    const { createOrgInput } = args
    return await organizationService.addOne(userID, createOrgInput)
  },
  async modifyOrganization (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { updateOrgInput } = args
    return await organizationService.modifyOne(currentOrg.id, updateOrgInput)
  },
  async deleteOrganization (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    return await organizationService.deleteOne(currentOrg.id)
  },
  async joinUser (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Key Validation
    const { key, relationOrgUserInput } = args
    const keyByValue = await keysService.keyByValue(key)
    if (keyByValue == null) throw new GraphQLError('Key Inválida')
    const now = new Date()
    const timeLapsed = (now.getTime() - keyByValue.creation_date.getTime()) / (1000 * 60)
    if (timeLapsed > 50) throw new GraphQLError('La Key ha expirado')
    // Organization Validation
    const { hasOrganization } = await validOrganization({ id: relationOrgUserInput.orgID }, currentUser, ['MASTER', 'ADMIN'])
    if (hasOrganization) throw new GraphQLError('Usuario ya en la Organización!')
    await keysService.deleteKey(key)
    return await organizationService.joinUser(relationOrgUserInput)
  },
  async removeUser (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    // Organization Validation
    const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER', 'ADMIN'])
    if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
    if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    const { userID } = args
    return await organizationService.removeUser(currentOrg.id, userID)
  }
}
