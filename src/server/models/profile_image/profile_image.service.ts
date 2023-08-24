import { prisma } from '#config/db'
import { deleteCloudImage, generateCloudCropImage, uploadCloudImage } from '#lib/cloudinary'
import { rm, writeFile } from 'fs/promises'
import path from 'path'
import { type FileInputType, type ProfileImageEntityType } from './entities/profile_image.entity'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLError } from 'graphql'

const profileImageModel = prisma.profile_image

export interface ProfileImageType {
  allImages: () => Promise<ProfileImageEntityType>
  oneImage: (imgID: string) => Promise<ProfileImageEntityType>
  addImage: (file: any, currentOrg: any, currentUser: any) => Promise<ProfileImageEntityType>
  myImage: (userID: string) => Promise<ProfileImageEntityType>
  deleteImage: (imgID: string) => Promise<ProfileImageEntityType>
}

class ProfileImage implements ProfileImageType {
  private static instance: ProfileImage
  private constructor () {}

  public static getInstance (): ProfileImage {
    if (ProfileImage.instance == null) {
      ProfileImage.instance = new ProfileImage()
    }

    return ProfileImage.instance
  }

  async allImages (): Promise<any> {
    return await profileImageModel.findMany({
      include: {
        organization: true,
        user: true
      }
    })
  }

  async oneImage (imgID: string): Promise<any> {
    return await profileImageModel.findUnique({
      where: { id: imgID },
      include: {
        organization: true,
        user: true
      }
    })
  }

  async myImage (userID: string): Promise<any> {
    return await profileImageModel.findUnique({
      where: { userID },
      include: {
        organization: true,
        user: true
      }
    })
  }

  async addImage (file: FileInputType, currentOrg: any, currentUser: any): Promise<any> {
    const filePath = new URL(`../../upload/${file.name}`, import.meta.url)
    await writeFile(filePath, file.blobParts)
    const fullPath = path.resolve(`src/server/upload/${file.name}`)
    const metaImage = await uploadCloudImage(fullPath)
    const cropedImageUrl = await generateCloudCropImage(metaImage.public_id)
    await rm(fullPath)
    const newMetaImage = {
      id: uuidv4(),
      public_id: metaImage.public_id,
      url: cropedImageUrl,
      creation_date: metaImage.created_at
    }
    if (currentOrg != null) {
      if (currentOrg.image != null) {
        await deleteCloudImage(currentOrg.image.public_id)
        return await profileImageModel.update({
          data: { ...newMetaImage },
          where: { id: currentOrg.image.id },
          include: { organization: true, user: true }
        })
      }
      return await profileImageModel.create({
        data: {
          ...newMetaImage,
          organization: { connect: { id: currentOrg.id } }
        }
      })
    }
    if (currentUser.image != null) {
      await deleteCloudImage(currentUser.image.public_id)
      return await profileImageModel.update({
        data: { ...newMetaImage },
        where: { id: currentUser.image.id },
        include: { organization: true, user: true }
      })
    }
    return await profileImageModel.create({
      data: {
        ...newMetaImage,
        user: { connect: { id: currentUser.id } }
      }
    })
  }

  async deleteImage (imgID: string): Promise<any> {
    const existImage = await profileImageModel.findUnique({
      where: { id: imgID }
    })
    if (existImage == null) throw new GraphQLError('La imagen no existe!')
    await deleteCloudImage(existImage.public_id)
    return await profileImageModel.delete({
      where: { id: imgID }
    })
  }
}

export const profileImageService = ProfileImage.getInstance()
