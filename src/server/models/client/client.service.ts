import { prisma } from '#config/db'
import { organizationService } from '#models/organization/org.service'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { type ClientCreateType } from './dto/client.create.dto'
import { type ClientUpdateType } from './dto/client.update.dto'
import { type ClientEntityType } from './entities/client.entity'
import { statusService } from '#models/status/status.service'
import { type ClientFilterType } from './dto/client.filter.dto'

const clientModel = prisma.client
const generalClientModel = prisma.generalclient

export interface ClientServiceType {
  myClients: (orgID: string) => Promise<ClientEntityType[]>
  oneClient: (clientID: string) => Promise<ClientEntityType>
  myClientsPaginated: (orgID: string, skip: number, take: number) => Promise<ClientEntityType[]>
  clientCountByPage: (orgID: string, skip: number, take: number) => Promise<number>
  myClientsFiltered: (filter: ClientFilterType, orgID: string) => Promise<ClientEntityType[]>
  countClientsByStatus: (orgID: string, statusCode: string) => Promise<number>
  addClient: (orgID: string, clientCreateInput: ClientCreateType) => Promise<ClientEntityType>
  modifyClient: (clientID: string, clientUpdateInput: ClientUpdateType) => Promise<ClientEntityType>
  deleteClient: (clientID: string) => Promise<ClientEntityType>
  modifyStatusClient: (clientID: string, statusCode: string) => Promise<ClientEntityType>
}

class ClientService implements ClientServiceType {
  private static instance: ClientService
  private constructor () {}

  public static getInstance (): ClientService {
    if (ClientService.instance == null) {
      ClientService.instance = new ClientService()
    }

    return ClientService.instance
  }

  async myClients (orgID: string): Promise<any> {
    return await clientModel.findMany({
      where: { orgID },
      include: {
        organization: true,
        status: true
      }
    })
  }

  async myClientsPaginated (orgID: string, skip: number, take: number): Promise<any> {
    return await clientModel.findMany({
      skip,
      take,
      where: { orgID }
    })
  }

  async oneClient (clientID: string): Promise<any> {
    return await clientModel.findUnique({
      where: { id: clientID },
      include: {
        organization: true,
        status: true
      }
    })
  }

  async clientCountByPage (orgID: string, skip: number, take: number): Promise<any> {
    return await clientModel.count({
      skip,
      take,
      where: { orgID }
    })
  }

  async myClientsFiltered (filter: ClientFilterType, orgID: string): Promise<any> {
    let response: any = []

    const filterActions = {
      name: async () => {
        return await clientModel.findMany({
          where: { orgID, fullName: { contains: filter.fullName } },
          include: {
            status: true
          }
        })
      }
    }

    if (filter.fullName != null) {
      response = await filterActions.name()
    }
    return response
  }

  async countClientsByStatus (orgID: string, statusCode: string): Promise<any> {
    return await clientModel.count({
      where: { orgID, status: { code: statusCode } }
    })
  }

  async addClient (orgID: string, clientCreateInput: ClientCreateType): Promise<any> {
    const existOrganzation = await organizationService.findOne(orgID)
    if (existOrganzation == null) throw new GraphQLError('La Organización no existe!')
    const existClientByIDNumber = await clientModel.findUnique({
      where: { idNumber: clientCreateInput.idNumber }
    })
    if (existClientByIDNumber != null) throw new GraphQLError('El Cliente ya existe!')
    const existClientByEmail = await clientModel.findUnique({
      where: { email: clientCreateInput.email }
    })
    if (existClientByEmail != null) throw new GraphQLError('El Cliente ya existe!')

    clientCreateInput.id = uuidv4()
    clientCreateInput.creation_date = new Date()

    const existGeneralClientByIDNumber = await generalClientModel.findUnique({
      where: { idNumber: clientCreateInput.idNumber }
    })
    const existGeneralClientByEmail = await generalClientModel.findUnique({
      where: { email: clientCreateInput.email }
    })
    if (existGeneralClientByIDNumber == null || existGeneralClientByEmail == null) {
      const generalClientInput = {
        id: clientCreateInput.id,
        fullName: clientCreateInput.fullName,
        idNumber: clientCreateInput.idNumber,
        email: clientCreateInput.email,
        address: clientCreateInput.address,
        telephone: clientCreateInput.telephone
      }
      await generalClientModel.create({
        data: { ...generalClientInput }
      })
    }
    return await clientModel.create({
      data: {
        ...clientCreateInput,
        organization: { connect: { id: orgID } },
        status: { connect: { code: 'A' } }
      }
    })
  }

  async modifyClient (clientID: string, clientUpdateInput: ClientUpdateType): Promise<any> {
    const existClient = await clientModel.findUnique({
      where: { id: clientID }
    })
    if (existClient == null) throw new GraphQLError('El cliente no existe!')
    return await clientModel.update({
      data: { ...clientUpdateInput },
      where: { id: clientID },
      include: {
        organization: true,
        status: true
      }
    })
  }

  async deleteClient (clientID: string): Promise<any> {
    const existClient = await clientModel.findUnique({
      where: { id: clientID }
    })
    if (existClient == null) throw new GraphQLError('El cliente no existe!')
    return await clientModel.delete({
      where: { id: clientID }
    })
  }

  async modifyStatusClient (clientID: string, statusCode: string): Promise<any> {
    const existClient = await clientModel.findUnique({
      where: { id: clientID }
    })
    if (existClient == null) throw new GraphQLError('El cliente no existe!')
    const existStatus = await statusService.oneStatus(statusCode)
    if (existStatus == null) throw new GraphQLError('El estado no existe!')
    return await clientModel.update({
      data: { status: { connect: { code: statusCode } } },
      where: { id: clientID },
      include: {
        organization: true,
        status: true
      }
    })
  }
}

export const clientService = ClientService.getInstance()
