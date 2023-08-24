import { prisma } from '#config/db'
import { SALT } from '#constants/SALT'
import { compare, hash } from 'bcrypt'
import { GraphQLError } from 'graphql'
import { SignJWT } from 'jose'
import { v4 as uuidv4 } from 'uuid'
import { type UserCreateDTO } from './dto/user.create.dto'
import { type UserUpdateDTO } from './dto/user.update.dto'
import { type Rol, type UserEntityType } from './entities/user.entity'

const userModel = prisma.user
const organizationToUserModel = prisma.organizationtouser

export interface UserServiceType {
  addOne: (createUsergInput: UserCreateDTO) => Promise<UserEntityType | null>
  findAll: () => Promise<UserEntityType[]>
  findOne: (id: string) => Promise<UserEntityType | null>
  searchRole: (userID: string, orgID: string) => Promise<any>
  usersByOrganization: (orgID: string) => Promise<UserEntityType | null>
  usersByOrganizationWithRol: (orgID: string) => Promise<any>
  login: (userName: string, password: string) => Promise<{ jwt: string }>
  modifyOne: (id: string, updateUserInput: UserUpdateDTO) => Promise<UserEntityType>
  modifyRoleByOrganization: (userID: string, orgID: string, rol: Rol) => Promise<any>
  deleteOne: (userID: string) => Promise<any>
}

class UserService implements UserServiceType {
  private static instance: UserService
  private constructor () {}

  public static getInstance (): UserService {
    if (UserService.instance == null) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  // QUERY
  async addOne (createUserInput: UserCreateDTO): Promise<UserEntityType | null> {
    const existUserIdentifier = await userModel.findUnique({
      where: {
        userName: createUserInput.userName
      }
    })
    if (existUserIdentifier != null) throw new GraphQLError('El Usuario ya existe!')
    const existUserEmail = await userModel.findUnique({
      where: {
        email: createUserInput.email
      }
    })
    if (existUserEmail != null) throw new GraphQLError('El Email ya existe!')
    createUserInput.id = uuidv4()
    const hashedPassword = await hash(createUserInput.password, SALT)
    createUserInput.password = hashedPassword
    createUserInput.creation_date = new Date()
    createUserInput.update_date = null
    createUserInput.update_by = null
    return await userModel.create({
      data: {
        ...createUserInput
      }
    })
  }

  async findAll (): Promise<any[]> {
    return await userModel.findMany({
      include: { organization: { select: { organization: {} } } }
    })
  }

  async findOne (id: string): Promise<any | null> {
    const currentDate = new Date()
    return await userModel.findUnique({
      where: { id },
      include: {
        organization: { select: { organization: {} } },
        image: true,
        payment: { where: { expiration_date: { gt: currentDate } } }
      }
    })
  }

  async searchRole (userID: string, orgID: string): Promise<string | undefined> {
    const organizationToUser = await organizationToUserModel.findUnique({
      where: { userID_orgID: { userID, orgID } }
    })
    return organizationToUser?.rol
  }

  async usersByOrganization (orgID: string): Promise<any | null> {
    return await userModel.findMany({
      where: { organization: { some: { orgID } } },
      include: {
        organization: { select: { organization: { }, rol: true } },
        image: true
      }
    })
  }

  async usersByOrganizationWithRol (orgID: string): Promise<any | null> {
    return await organizationToUserModel.findMany({
      where: { orgID },
      include: { user: { include: { image: true } } }
    })
  }

  // MUTATION
  async login (userName: string, password: string): Promise<{ jwt: string }> {
    const existUser = await userModel.findUnique({
      where: { userName }
    })
    if (existUser == null) throw new GraphQLError('Nombre de Usuario o Contraseña incorrectos')
    const checkPassword = await compare(password, existUser.password)
    if (!checkPassword) throw new GraphQLError('Sin Autorización')
    const encoder = new TextEncoder()
    const jwtConstructor = new SignJWT({ id: existUser.id })

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

  async modifyOne (id: string, updateUserInput: UserUpdateDTO): Promise<any> {
    const existOrganization = await userModel.findUnique({
      where: { id }
    })
    if (existOrganization == null) throw new GraphQLError('La Organización no existe!')
    if (updateUserInput.password != null) {
      const checkPassword = await compare(updateUserInput.password, existOrganization.password)
      if (!checkPassword) {
        const hashedPassword = await hash(updateUserInput.password, SALT)
        updateUserInput.password = hashedPassword
      }
      delete updateUserInput.password
    }
    updateUserInput.update_date = new Date()
    return await userModel.update({
      data: { ...updateUserInput },
      where: { id },
      include: { organization: { select: { organization: {} } } }
    })
  }

  async modifyRoleByOrganization (userID: string, orgID: string, rol: Rol): Promise<any> {
    const existUser = await userModel.findUnique({
      where: { id: userID }
    })
    if (existUser == null) throw new GraphQLError('Usuario no existe!')
    const updatedRol = await organizationToUserModel.update({
      data: { rol },
      where: { userID_orgID: { orgID, userID } }
    })
    return updatedRol.rol
  }

  async deleteOne (userID: string): Promise<any> {
    const existOrganization = await userModel.findUnique({
      where: { id: userID }
    })
    if (existOrganization == null) throw new GraphQLError('El Usuario no existe!')
    const deletedUser = await userModel.delete({
      where: { id: userID },
      include: { organization: { where: { userID }, select: { organization: {} } } }
    })
    return deletedUser
  }
}

export const userService = UserService.getInstance()
