import { GraphQLError } from 'graphql'
import { userService } from './user.service'

// QUERY
export const userQueryResolver = {
  async allUsers (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await userService.findAll()
  },
  async oneUser (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await userService.findOne(args.id)
  },
  async myUsers (root: any, args: any, context: any) {
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { organization } = currentUser
    const { orgID } = args
    const hasOrganization = organization.some((org: any) => org.organization.id === orgID) as boolean
    if (!hasOrganization) return []
    const usersByOrganization = await userService.usersByOrganization(orgID)
    return usersByOrganization
  },
  async myUsersWithRol (root: any, args: any, context: any) {
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { organization } = currentUser
    const { orgID } = args
    const hasOrganization = organization.some((org: any) => org.organization.id === orgID) as boolean
    if (!hasOrganization) return []
    const usersByOrganizationWithRol = await userService.usersByOrganizationWithRol(orgID)
    return usersByOrganizationWithRol
  },
  me (root: any, args: any, context: any) {
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    return currentUser
  }
}

// MUTATION
export const userMutationResolver = {
  async login (root: any, args: any) {
    const { userName, password } = args
    return await userService.login(userName, password)
  },
  async addUser (root: any, args: any, context: any) {
    const { createUserInput } = args
    return await userService.addOne(createUserInput)
  },
  async modifyUser (root: any, args: any, context: any) {
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { userID, updateUserInput } = args
    if (userID !== currentUser.id) throw new GraphQLError('Usuario no Autorizado')
    return await userService.modifyOne(userID, updateUserInput)
  },
  async modifyRole (root: any, args: any, context: any) {
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { userID, rol } = args
    const currentRol = await userService.searchRole(currentUser.id, currentOrg.id)
    if (currentRol == null) throw new GraphQLError('Usuario no Autorizado')
    if (currentRol !== 'MASTER' && currentRol !== 'ADMIN') throw new GraphQLError('Usuario sin permisos')
    return await userService.modifyRoleByOrganization(userID, currentOrg.id, rol)
  },
  async deleteUser (root: any, args: any, context: any) {
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { userID } = args
    return await userService.deleteOne(userID)
  }
}
