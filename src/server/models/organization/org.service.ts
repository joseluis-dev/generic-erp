import { prisma } from '#config/db'
import { v4 as uuidv4 } from 'uuid'
import { type OrganizationCreateDTO } from './dto/org.create.dto'
import { type OrganizationEntityType } from './entities/organization.entity'
import { GraphQLError } from 'graphql'
import { type OrganizationUpdateDTO } from './dto/org.update.dto'
import { userService } from '#models/user/user.service'
import { SignJWT } from 'jose'

const orgModel = prisma.organization
const relationOrgUserModel = prisma.organizationtouser

export interface OrganizationServiceType {
  findAll: () => Promise<OrganizationEntityType[]>
  findOne: (id: string) => Promise<OrganizationEntityType | null>
  myOrganizations: (userID: string) => Promise<any[]>
  orgLogin: (orgID: string) => Promise<any>
  addOne: (userID: string, createOrgInput: OrganizationCreateDTO) => Promise<OrganizationEntityType | null>
  modifyOne: (id: string, updateOrgInput: OrganizationUpdateDTO) => Promise<OrganizationEntityType>
  deleteOne: (id: string) => Promise<any>
  joinUser: (relationOrgUserInput: any) => Promise<string>
  removeUser: (orgID: string, userID: string) => Promise<string>
}

class OrganizationService implements OrganizationServiceType {
  private static instance: OrganizationService
  private constructor () {}

  public static getInstance (): OrganizationService {
    if (OrganizationService.instance == null) {
      OrganizationService.instance = new OrganizationService()
    }

    return OrganizationService.instance
  }

  async findAll (): Promise<any[]> {
    return await orgModel.findMany({
      include: { user: { select: { user: {} } } }
    })
  }

  async findOne (id: string): Promise<any | null> {
    return await orgModel.findUnique({
      where: { id },
      include: {
        user: { select: { user: {} } },
        image: true
      }
    })
  }

  async myOrganizations (userID: string): Promise<any[]> {
    return await orgModel.findMany({
      where: { user: { some: { userID } } },
      include: {
        user: { select: { user: {} } },
        image: true
      }
    })
  }

  async orgLogin (orgID: string): Promise<any> {
    console.log(orgID)
    const encoder = new TextEncoder()
    const jwtConstructor = new SignJWT({ id: orgID })

    const jwt = await jwtConstructor
      .setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT'
      })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))
    return { jwt }
  }

  async addOne (userID: string, createOrgInput: OrganizationCreateDTO): Promise<any | null> {
    const existOrganizationIdentifier = await orgModel.findUnique({
      where: {
        identifier: createOrgInput.identifier
      }
    })
    if (existOrganizationIdentifier != null) throw new GraphQLError('La Organización ya existe!')
    const existOrganizationEmail = await orgModel.findUnique({
      where: {
        email: createOrgInput.email
      }
    })
    if (existOrganizationEmail != null) throw new GraphQLError('La Organización ya existe!')
    createOrgInput.id = uuidv4()
    createOrgInput.creation_date = new Date()
    createOrgInput.update_date = null
    await orgModel.create({
      data: {
        ...createOrgInput
      }
    })
    await relationOrgUserModel.create({
      data: {
        user: { connect: { id: userID } },
        organization: { connect: { id: createOrgInput.id } },
        rol: 'MASTER'
      }
    })
    return await orgModel.findUnique({
      where: { id: createOrgInput.id },
      include: { user: { select: { user: {} } } }
    })
  }

  async modifyOne (id: string, updateOrgInput: OrganizationUpdateDTO): Promise<any> {
    const existOrganization = await orgModel.findUnique({
      where: { id }
    })
    if (existOrganization == null) throw new GraphQLError('La Organización no existe!')
    updateOrgInput.update_date = new Date()
    return await orgModel.update({
      data: { ...updateOrgInput },
      where: { id },
      include: { user: { select: { user: {} } } }
    })
  }

  async deleteOne (id: string): Promise<any> {
    const existOrganization = await orgModel.findUnique({
      where: { id }
    })
    if (existOrganization == null) throw new GraphQLError('La Organización no Existe')
    const deletedOrganization = await orgModel.delete({
      where: { id },
      include: { user: { where: { orgID: id }, select: { user: {} } } }
    })
    return deletedOrganization
  }

  async joinUser (relationOrgUserInput: any): Promise<string> {
    const { userID: userIDToJoin, orgID } = relationOrgUserInput
    const existUser = await userService.findOne(userIDToJoin)
    if (existUser == null) throw new GraphQLError('El Usuario no existe!')
    const existOrganization = await orgModel.findUnique({
      where: { id: orgID }
    })
    if (existOrganization == null) throw new GraphQLError('La Organización no Existe')
    const relationCreated = await relationOrgUserModel.create({
      data: { ...relationOrgUserInput }
    })
    if (relationCreated == null) throw new GraphQLError('Fallo al añadir usuario')
    return 'SUCCESS'
  }

  async removeUser (orgID: string, userID: string): Promise<string> {
    const existUser = await userService.findOne(userID)
    if (existUser == null) throw new GraphQLError('El Usuario no existe!')
    const existOrganization = await orgModel.findUnique({
      where: { id: orgID }
    })
    if (existOrganization == null) throw new GraphQLError('La Organización no Existe')
    const relationRemoved = await relationOrgUserModel.delete({
      where: { userID_orgID: { orgID, userID } }
    })
    if (relationRemoved == null) throw new GraphQLError('Fallo al remover el Usuario!')
    return 'SUCCESS'
  }
}

export const organizationService = OrganizationService.getInstance()
