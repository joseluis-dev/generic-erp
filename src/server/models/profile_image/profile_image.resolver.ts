import { validOrganization } from '#middlewares/validOrg.middleware'
import { GraphQLError } from 'graphql'
import { type FileInputType } from './entities/profile_image.entity'
import { profileImageService } from './profile_image.service'

export const profileImageQueryResolver = {
  async allImages (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    return await profileImageService.allImages()
  },
  async oneImage (root: any, args: any, context: any) {
    const { secretPass } = args
    if (secretPass !== process.env.SECRET_PASSWORD) throw new GraphQLError('Usuario no Autorizado')
    const { imgID } = args
    return await profileImageService.oneImage(imgID)
  },
  async myImage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    const { id: userID } = currentUser
    return await profileImageService.myImage(userID)
  }
}

export const profileImageMutationResolver = {
  async addImage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser, currentOrg } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    if (currentOrg != null) {
      // Organization Validation
      const { hasAccess, hasOrganization } = await validOrganization(currentOrg, currentUser, ['MASTER'])
      if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
      if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    }
    const { file }: { file: FileInputType } = args
    return await profileImageService.addImage(file, currentOrg, currentUser)
  },
  async deleteImage (root: any, args: any, context: any) {
    // Login Validation
    const { currentUser } = context
    if (currentUser == null) throw new GraphQLError('Usuario no Autorizado')
    if (args.orgID != null) {
      // Organization Validation
      const { hasAccess, hasOrganization } = await validOrganization(args, currentUser, ['MASTER'])
      if (!hasOrganization) throw new GraphQLError('Usuario no Autorizado')
      if (!hasAccess) throw new GraphQLError('Usuario no Autorizado')
    }
    const { imgID } = args
    return await profileImageService.deleteImage(imgID)
  }
}
